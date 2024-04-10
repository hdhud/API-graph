const express = require('express');
const Chartdata = require('./ChartData.js');
const multer = require('multer');
const cors = require('cors'); // Importez le module CORS

const app = express();
const upload = multer();
const upload2 = multer({ dest: 'uploads/' });
const fs = require('fs');
const csv = require('csv-parser');
const bodyParser = require('body-parser');
const path = require('path');

// Middleware CORS
app.use(cors());
app.use(bodyParser.json());
const publicDirectoryPath = path.join(__dirname, 'public');

// Configurez express pour servir des fichiers statiques à partir du répertoire public
app.use(express.static(publicDirectoryPath));
// Endpoint API pour générer le graphique
app.post('/api/generate-chart', upload.fields([{ name: 'dataFile1', maxCount: 1 }, { name: 'dataFile2', maxCount: 1 }]), (req, res) => {

    // Vérifier si les fichiers sont présents dans la requête
    if (!req.files || !req.files['dataFile1'] || !req.files['dataFile2']) {
        return res.status(400).json({ error: 'Les fichiers JSON sont requis.' });
    }

    // Vérifier si les fichiers sont au format JSON
    try {
        JSON.parse(req.files['dataFile1'][0].buffer.toString('utf8'));
        JSON.parse(req.files['dataFile2'][0].buffer.toString('utf8'));
    } catch (error) {
        return res.status(400).json({ error: 'Les fichiers doivent être au format JSON.' });
    }

    // Vérifier si les données nécessaires sont présentes dans les fichiers
    const data = JSON.parse(req.files['dataFile1'][0].buffer.toString('utf8'));
    const datachart = JSON.parse(req.files['dataFile2'][0].buffer.toString('utf8'));
    if (!data.rows || !data.cols) {
        return res.status(400).json({ error: 'Le fichier 1 doit contenir les éléments "rows" et "cols".' });
    }
    
    if (!datachart.type || !datachart.colX || !datachart.tailleX || !datachart.tailleY) {
        return res.status(400).json({ error: 'Le fichier 2 doit contenir les éléments "type", "param", "tailleX" et "tailleY".' });
    }
    // console.log('Data from File 1:', data);
    // console.log('Data from File 2:', datachart);
    
    // Générer le graphique
    const ChartData = new Chartdata (datachart,data);
    const chart = ChartData.createChart();

    // Convertir le graphique en image PNG
    const image = chart.canvas.toBuffer();
    // Renvoyer l'image en réponse
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    });
    res.end(image);
    console.log("Création image ✅")
});
app.post('/api/upload-csv', upload2.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    const results = { cols: [], rows: [] };
    const typecols = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('headers', (headers) => {
            headers.forEach(header => {
                var cols = header.split('";"');
                cols.shift(); // Supprimer la première colonne vide
                cols.forEach(col => {
                    // Ajouter les colonnes à results.cols
                    results.cols.push({
                        id: col,
                        label: col,
                        type: '' // Initialiser le type à vide
                    });
                });
            });
        })
        .on('data', (data) => {
            Object.keys(data).forEach((key, index) => {
                // Mettre à jour les types de colonnes dans typecols
                let values = data[key].split('";"');
                values.shift(); // Supprimer la première colonne vide
                for (let i = 0; i < values.length; i++) {
                    if (!(typecols[i] == 'string' || typecols[i] == 'float')) {
                        if (!isNaN(parseInt(values[i]))) {
                            if (Number.isInteger(parseFloat(values[i].replace(',', '.')))) {
                                typecols[i] =  "number";
                            } else {
                                typecols[i] = "float";
                            }
                        } else {
                            typecols[i] = "string";
                        }
                    }
                }
            });
        })
        .on('data', (data) => {
            // Convertir les données et les stocker dans results.rows
            let rowData = { c: [] };
            Object.keys(data).forEach(key => {
                let values = data[key].split('";"');
                values.shift(); // Supprimer la première colonne vide
                values.forEach(value => {
                    if (!isNaN(parseInt(value))) {
                        if (Number.isInteger(parseFloat(value.replace(',', '.')))) {
                            rowData.c.push(parseInt(value));
                        } else {
                            rowData.c.push(parseFloat(value.replace(',', '.')));
                        }
                    } else {
                        rowData.c.push(value);
                    }
                });
            });
            results.rows.push(rowData);
        })
        .on('end', () => {
            // Mettre à jour les types de colonnes dans results.cols
            results.cols.forEach((col, index) => {
                col.type = typecols[index]; // Utiliser 'string' par défaut si le type est indéfini
            });
            
            // Envoyer les résultats
            res.json(results);
            // Supprimer le fichier CSV après lecture
            fs.unlinkSync(req.file.path);
        });
});
app.post('/api/upload-sql', upload2.single('sqlFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    // Lire le contenu du fichier SQL
    fs.readFile(req.file.path, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file.');
        }

        // Appeler la fonction de traitement des données SQL
        const result = processSQLData(data);

        // Répondre avec les résultats
        res.json(result);

        // Supprimer le fichier téléchargé après lecture
        fs.unlinkSync(req.file.path);
    });
});

// Fonction pour traiter les données SQL
function processSQLData(sqlData) {
    const results = { cols: [], rows: [] };
    let typecols = [];
    const queries = sqlData.split(';');
    
    queries.forEach(query => {
        const rowData = { c: [] };
        // Ignorer les instructions vides ou de commentaire
        if (query.trim() !== '' && !query.startsWith('--') && query.split('values (')[1]) {        
            const values = query.split('values (')[1].split(',');
            const lastValueIndex = values.length - 1;
            values[lastValueIndex] = values[lastValueIndex].slice(0, values[lastValueIndex].length-1);
            const trimmedValues = values.map(value => value.trim().replace(/^'|'$/g, ''));
            for (let i = 0; i < trimmedValues.length; i++) {
                if(trimmedValues[i].includes('to_date(')){
                    const startDate = trimmedValues[i].indexOf("'");
                    const dateString = trimmedValues[i].substring(startDate + 1);
                    const date = dateString.split('-');
                trimmedValues[i] = (new Date(date[2].substring(0,4),date[1],date[0])).toJSON();
                trimmedValues.splice(i + 1, 1);
                i--;
                typecols[i]='date';
                }
            }
            for (let i = 0; i < trimmedValues.length; i++) {
                if (!(typecols[i] == 'string' || typecols[i] == 'float') && trimmedValues[i] !== "null" && typecols[i]!='date') {
                    if (!isNaN(parseInt(trimmedValues[i]))) {
                        if (Number.isInteger(parseFloat(trimmedValues[i]))) {
                            typecols[i] = "number";
                        } else {
                            typecols[i] = "float";
                        }
                    } else {
                        typecols[i] = "string";
                    }
                }
                rowData.c.push(trimmedValues[i]);
            }
            results.rows.push(rowData);
        }
    });
    const startIndex = queries[1].indexOf('(');
    const endIndex = queries[1].indexOf(')');

    const columnString = queries[1].substring(startIndex + 1, endIndex);

    const columns = columnString.split(',');

    const trimmedColumns = columns.map(column => column.trim());

    for(let i=0;i<trimmedColumns.length;i++){
        results.cols.push({
            id: trimmedColumns[i],
            label: trimmedColumns[i],
            type: typecols[i] || 'string'
        });
    }
    return results;
}

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});