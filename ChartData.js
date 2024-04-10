const Chart = require('chart.js/auto');
const canvas = require('canvas');
const ChartDataLabels = require('chartjs-plugin-datalabels');
const fs = require('fs');
const path = require('path');

class Chartdata {
    constructor(datachart,data) {
        this._type = datachart.type || 'line';
        this._titre = datachart.titre || '';
        this._titreX = datachart.titreX || '';
        this._titreY = datachart.titreY || '';
        this._legendposition = datachart.legendposition || '';
        this._tailleX = datachart.tailleX || 800;
        this._tailleY = datachart.tailleY || 600;
        this._colX = datachart.colX;
        this._colY = datachart.colY || null;
        this._agregation = datachart.agregation;
        this._indexAxis = datachart.indexAxis || 'x';
        this._color = (datachart.color && datachart.color.length > 0) ? datachart.color : ['rgb(0, 96, 255)','rgb(255, 99, 132)','rgb(75, 192, 192)','rgb(153, 102, 255)','rgb(255, 205, 86)','rgb(255, 159, 64)','rgb(255, 192, 203)','rgb(50, 205, 50)','rgb(255, 69, 0)','rgb(70, 130, 180)','rgb(128, 0, 128)','rgb(255, 140, 0)','rgb(0, 128, 0)','rgb(255, 215, 0)','rgb(255, 0, 255)','rgb(0, 255, 255)',]
        this._showQuantity = datachart.showQuantity || false;
        this._startFromZero = datachart.startFromZero || false;
        this._selection = datachart.selection || {};
        this._fontlegend = datachart.fontlegend || {};
        this._fontlegendcolor = datachart.fontlegendcolor || 'black';
        this._fonttitre = datachart.fonttitre || {};
        this._fonttitrecolor = datachart.fonttitrecolor || 'black';
        this._fontaxis = datachart.fontaxis || {};
        this._fontaxiscolor = datachart.fontaxiscolor || 'black';
        this._fontlabelaxis = datachart.fontlabelaxis || {};
        this._fontlabelaxiscolor = datachart.fontlabelaxiscolor || 'black';
        this._columns = data.cols || []
        this._data = data.rows || [];

        this._logmessages =[];
    }

    get type() {
        return this._type;
    }

    get titre() {
        return this._titre;
    }

    get titreX() {
        return this._titreX;
    }

    get titreY() {
        return this._titreY;
    }

    get legendposition() {
        return this._legendposition;
    }

    get tailleX() {
        return this._tailleX;
    }

    get tailleY() {
        return this._tailleY;
    }

    get colX() {
        return this._colX;
    }

    get colY() {
        return this._colY;
    }

    get agregation() {
        return this._agregation;
    }

    get indexAxis() {
        return this._indexAxis;
    }

    get showQuantity() {
        return this._showQuantity;
    }

    get startFromZero() {
        return this._startFromZero;
    }

    get color() {
        return this._color;
    }

    get selection() {
        return this._selection;
    }

    get fontlegend() {
        return this._fontlegend;
    }

    get fontlegendcolor() {
        return this._fontlegendcolor;
    }

    get fonttitre() {
        return this._fonttitre;
    }

    get fonttitrecolor() {
        return this._fonttitrecolor;
    }

    get fontaxis() {
        return this._fontaxis;
    }

    get fontaxiscolor() {
        return this._fontaxiscolor;
    }

    get fontlabelaxis() {
        return this._fontlabelaxis;
    }

    get fontlabelaxiscolor() {
        return this._fontlabelaxiscolor;
    }
    get columns(){
        return this._columns
    }

    get data(){
        return this._data
    }

    get logMessage(){
        return this._logmessages
    }

    get options() {
        let options = {
            plugins:{
                title:{
                    display:this.titre ? true : false,
                    text:this.titre,
                    font:this._fonttitre,
                    color:this.fonttitrecolor
                },
                legend:{
                    display:this.legendposition ? true : false,
                    position:this.legendposition,
                    labels: {
                        font:this.fontlegend,
                        color:this.fontlegendcolor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero:this.startFromZero,
                    title: {
                        display: this.titreY ? true : false,
                        text:this.titreY,
                        font:this.fontaxis,
                        color:this.fontaxiscolor,
                    },
                    ticks: {
                        font:this.fontlabelaxis,
                        color:this.fontlabelaxiscolor
                    }
                },
                x: {
                    title: {
                        display: this.titreX ? true : false,
                        text:this.titreX,
                        font:this.fontaxis,
                        color:this.fontaxiscolor,
                    },
                    ticks: {
                        font:this.fontlabelaxis,
                        color:this.fontlabelaxiscolor,
                    }
                }
            }
        };
        if (this.type === 'pie') {
            options.scales ={}
            options.plugins = options.plugins || {};
            options.plugins.datalabels = options.plugins.datalabels || {};
            options.plugins.datalabels.anchor = 'end';
            options.plugins.datalabels.align = 'start';
            options.plugins.datalabels.offset = 30;
            options.plugins.datalabels.color = 'white'; 
            options.plugins.datalabels.font = {
                weight: '900'
            };
            options.plugins.datalabels.formatter = (value, context) => {
                var moyenne = ((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
                return moyenne > 2 ? moyenne + '%' : "";
            };
        }
        return options
    }
    addLog(logMessage){
        const now = new Date();
        // Extraire les composants de la date et de l'heure
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hour = ('0' + now.getHours()).slice(-2);
        const minute = ('0' + now.getMinutes()).slice(-2);
        const second = ('0' + now.getSeconds()).slice(-2);
        const stringDate =`${year}-${month}-${day} ${hour}:${minute}:${second}`;

        this._logmessages.push(`[${stringDate}] - ${logMessage}`);
    }

    writeLog() {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hour = ('0' + now.getHours()).slice(-2);
        const minute = ('0' + now.getMinutes()).slice(-2);
        const second = ('0' + now.getSeconds()).slice(-2);
        const stringDate = `${year}${month}${day}-${hour}${minute}${second}`;

        const logDirectory = './logs';
        const logFilePath = path.join(logDirectory, `${stringDate}.log`);
        // Créez le répertoire des logs s'il n'existe pas
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true }); // Utilisez l'option recursive pour créer des répertoires parents si nécessaire
        }

        // Concaténer tous les messages de log en une seule chaîne de caractères
        const logMessagesString = this.logMessage.join('\n');

        // Écrire le message de log dans le fichier
        fs.appendFileSync(logFilePath, logMessagesString, 'utf8', (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture des logs :', err);
            }
        });
    }

    // Fonction pour créer un graphique avec journalisation
    createChart() {
        const [datasets, labels] = this.createdatasetlabels();
        // Écrivez un message de log avec les informations pertinentes
        const logMessage = `Nouveau graphique créé : Type - ${this.type}, Titre - ${this.titre}, Nombre de données - ${labels.length}`;
        this.addLog(logMessage);
        this.writeLog();

        var plugins = [];
        if (this.type) {
            plugins.push(ChartDataLabels);
        }

        var chart = new Chart(new canvas.Canvas(this.tailleX, this.tailleY), {
            type: this.type,
            data: {
                labels: labels,
                datasets: [datasets]
            },
            options: this.options,
            plugins: [plugins],
        });
        return chart;
    }
    createdatasetlabels() {
        var quantitylabels = [];
        var dataregrouper = this.regrouperParParametre();
        this.addLog("Données regrouper : "+JSON.stringify(dataregrouper,null,2))
        var labels = this.getlabels(dataregrouper);
        var dataset = {
            label: "Quantité",
            data: [],
            fill: true,
            spanGaps: true,
            tension: 0.3,
        }
        if (this.type == 'pie') {
            dataset.backgroundColor = this.color;
        } else if (this.type == 'line') {
            dataset.borderColor = this.color[0];
            dataset.backgroundColor = this.adjustColorOpacity(this.color[0], 0.5);
        } else if (this.type == 'bar') {
            dataset.backgroundColor = this.color[0];
        }
        for (var label of labels) {
            var ligne = dataregrouper.find(ds => (ds.parametre == label));
            if (ligne) {
                switch(this.agregation) {
                    case "somme":
                        var somme = this.sommedata(this.getIndexByColumnName(this.colY),ligne.donnees);
                        dataset.data.push(somme);
                        quantitylabels.push(label + ` (${somme})`);
                        break;
                    case "moyenne":
                        var somme = this.sommedata(this.getIndexByColumnName(this.colY),ligne.donnees);
                        var moyenne = parseFloat((somme/ligne.donnees.length).toFixed(3));
                        dataset.data.push(moyenne);
                        quantitylabels.push(label + ` (${moyenne})`); 
                        break;
                    case "qte":
                        dataset.data.push(ligne.donnees.length);
                        quantitylabels.push(label + ` (${ligne.donnees.length})`+"aaaa");
                        break;
                    default:
                        break;
                }
            } else {
                dataset.data.push(null);
            }
        }
    
        if (this.showQuantity ===true){
            this.addLog("Dataset : "+JSON.stringify(dataset,null,2));
            this.addLog("Labels affichés : "+quantitylabels)
            return [dataset, quantitylabels];
        }else {
            this.addLog("Dataset : "+JSON.stringify(dataset,null,2));
            this.addLog("Labels affichés : "+labels)
            return [dataset, labels];
        }
    }
    dataselection() {
        this.addLog("Nombre de donnée : " + this.data.length);
        this.addLog("Paramètre de selection : " + JSON.stringify(this.selection,null,2));
        var resultatselection = [];
 
        if (this.selection) {
            this.data.forEach(item => {
                var match = true;
                for (var key in this.selection) {
                    const itemvalue = item.c[this.getIndexByColumnName(key)];
                    for(var param in this.selection[key] ){
                        const paramvalue =this.selection[key][param]
                        const firstcaract = paramvalue[0]
                        if(this.getTypeByColumnIndex(this.getIndexByColumnName(key))=='date'){
                            var paramdate;
                            if (firstcaract =='!' || firstcaract =='>' || firstcaract =='<'){
                                paramdate = new Date (paramvalue.substring(1));
                            }
                            else{
                                paramdate = new Date (paramvalue);
                            }
                            const itemdate =new Date (itemvalue);
    
                            if (firstcaract =='!') {
                                if (paramdate - itemdate == 0) {
                                    match = false;
                                    break;
                                }
                            }else if (firstcaract =='<') {
                                if (paramdate <= itemdate ) {
                                    match = false;
                                    break;
                                }
                            }else if (firstcaract =='>') {
                                if (paramdate >= itemdate) {
                                    match = false;
                                    break;
                                }
                            } else {
                                if (paramdate - itemdate != 0) {
                                    match = false;
                                    break;
                                }
                            }
                        }
                        else{
                            if (firstcaract =='!') {
                                if (paramvalue.substring(1).includes(itemvalue)) {
                                    match = false;
                                    break;
                                }
                            }else if (firstcaract =='<') {
                                if (parseFloat(paramvalue.substring(1))<= parseFloat(itemvalue)) {
                                    match = false;
                                    break;
                                }
                            }else if (firstcaract =='>') {
                                if (parseFloat(paramvalue.substring(1))>= parseFloat(itemvalue)) {
                                    match = false;
                                    break;
                                }
                            } else {
                                if (!(this.selection[key].includes(itemvalue))) {
                                    match = false;
                                    break;
                                }
                            }
                        }
                    }
                    if(!match){
                        break;
                    }
                }
                if (match) {
                    resultatselection.push(item);
                }
            });
        }
        this.addLog("Nombre de donnée selctionné : "+ resultatselection.length);
        return resultatselection;
    }
    regrouperParParametre() {
        const parametre =this.getIndexByColumnName(this.colX);
        const groupeMap = new Map();
        const regexdate = /^\d{4}-\d{2}-\d{2}/;
        // Parcourir la liste d'éléments
        this.dataselection().forEach(item => {
            let valeurParametre;
            if (regexdate.test(item.c[parametre])) {
                valeurParametre = item.c[parametre].substring(0,10);
            } else {
                // Sinon, utiliser directement la valeur
                valeurParametre = item.c[parametre];
            }
    
            if (!groupeMap.has(valeurParametre)) {
                groupeMap.set(valeurParametre, [item]);
            } else {
                groupeMap.get(valeurParametre).push(item);
            }
        });
        // Convertir la carte en tableau d'objets
        const resultatGroupe = Array.from(groupeMap, ([cle, valeur]) => ({
            parametre: cle,
            donnees: valeur
        }));
    
        // Trier le tableau d'objets en fonction de la clé
        resultatGroupe.sort((a, b) => {
            const valeurA = a.parametre;
            const valeurB = b.parametre;
    
            if (typeof valeurA === 'number' && typeof valeurB === 'number') {
                return valeurA - valeurB;
            } else if (typeof valeurA === 'string' && typeof valeurB === 'string') {
                return valeurA.localeCompare(valeurB, undefined, { numeric: true });
            } else if (valeurA instanceof Date && valeurB instanceof Date) {
                return valeurA - valeurB;
            } else {
                return typeof valeurA === 'string' ? -1 : 1;
            }
        });
        for (var ligne of resultatGroupe) {
            this.addLog("Label : "+ligne.parametre + "Nombre de données : " + ligne.donnees.length);
        }
        return resultatGroupe;
    }
    getlabels(dataregrouper) {
        const idcolumn = this.getIndexByColumnName(this.colX);
        let labels =[]
        for (var ligne of dataregrouper) {
            if(this.getTypeByColumnIndex(idcolumn)== 'date'){
                labels.push(ligne.parametre.substring(0,10));
            }else{
    
                labels.push(ligne.parametre);
            }
        }
        labels.sort();
        this.addLog("Labels triés : "+labels)
        return labels;
    }

    getTypeByColumnIndex(Index){
        return this.columns[Index] ? this.columns[Index].type : undefined;
    }

    getIndexByColumnName(columnName) {
        // this.addLog(columnName);
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].id === columnName) {
                return i;
            }
        }
        return -1; // Retourne -1 si la colonne n'est pas trouvée
    }
    sommedata(col,data){
        var somme = 0
        for(var i =0; i<data.length;i++){
            if (!["null",null].includes(data[i].c[col]) && !isNaN(parseFloat(data[i].c[col]))){
                somme += parseFloat(data[i].c[col]);
            }
        }
        somme = parseFloat(somme.toFixed(3));
        this.addLog("Somme : " + somme)
        return somme;
    }
    adjustColorOpacity(rgbColor, opacity) {

        return `rgba${rgbColor.slice(3, -1)}, ${opacity})`;
    }
}

module.exports = Chartdata;