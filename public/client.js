document.addEventListener('DOMContentLoaded', () => {
    const chartForm = document.getElementById('chartForm');
    const chartImage = document.getElementById('chartImage');

    chartForm.addEventListener('submit', event => {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        const formData = new FormData();
        const dataFile1 = document.getElementById('dataFile1').files[0];
        const dataFile2 = document.getElementById('dataFile2').files[0];

        formData.append('dataFile1', dataFile1);
        formData.append('dataFile2', dataFile2);

        fetch('http://localhost:3000/api/generate-chart', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok',response);
            }
            return response.blob(); // Convertir la réponse en blob
        })
        .then(blob => {
            const imageURL = URL.createObjectURL(blob); // Créer une URL objet à partir du blob
            chartImage.src = imageURL; // Définir l'URL de l'image
            // const link = document.createElement('a');
            // link.href = imageURL;
            // link.download = 'data.json';
            // document.body.appendChild(link);
            // link.click();
        })
        .catch(error => {
            console.error('Error generating chart:', error);
        });
    });
});

document.getElementById('uploadFormcsv').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('csvFile', document.getElementById('csvFile').files[0]);

    try {
        const response = await fetch('http://localhost:3000/api/upload-csv', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            console.log(JSON.stringify(data,null,2));

            // Créer un fichier JSON à partir des données récupérées
            const jsonData = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);

            // Créer un lien de téléchargement pour le fichier JSON
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.json';
            document.body.appendChild(link);
            link.click();

            // Nettoyer après le téléchargement
            window.URL.revokeObjectURL(url);
            link.remove();

            alert('Fichier JSON téléchargé avec succès.');
        } else {
            console.error('Erreur lors de l\'envoi du fichier CSV:', response.statusText);
            alert('Erreur lors de l\'envoi du fichier CSV.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier CSV:', error);
        alert('Erreur lors de l\'envoi du fichier CSV.');
    }
});

document.getElementById('uploadFormsql').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('sqlFile', document.getElementById('sqlFile').files[0]);

    try {
        const response = await fetch('http://localhost:3000/api/upload-sql', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            // console.log(JSON.stringify(data,null,2));

            // Créer un fichier JSON à partir des données récupérées
            const jsonData = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);

            // Créer un lien de téléchargement pour le fichier JSON
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.json';
            document.body.appendChild(link);
            link.click();

            // Nettoyer après le téléchargement
            window.URL.revokeObjectURL(url);
            link.remove();

            alert('Fichier JSON téléchargé avec succès.');
        } else {
            console.error('Erreur lors de l\'envoi du fichier CSV:', response.statusText);
            alert('Erreur lors de l\'envoi du fichier CSV.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier CSV:', error);
        alert('Erreur lors de l\'envoi du fichier CSV.');
    }
});

document.getElementById('download-chart').addEventListener('click', () => {
    const chartImage = document.getElementById('chartImage');
    const imageURL = chartImage.src;

    // Créer un lien de téléchargement pour l'image
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'chart_image.png'; // Nom du fichier à télécharger
    document.body.appendChild(link);
    link.click();

    // Nettoyer après le téléchargement
    document.body.removeChild(link);
});

fetch('modified_data.json')
  .then(response => {
    // Vérification de la réponse du serveur
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier JSON');
    }
    // Analyse de la réponse JSON
    return response.json();
  })
  .then(data => {
    // Traitement des données JSON
    console.log(data);
    data.rows.forEach(function(item) {
        // console.log(item.c[13])
        const dateParts = item.c[13].match(/\d+/g);
        valeurParametre = String(dateParts[0]) + "-" + String(parseInt(dateParts[1])+1).padStart(2, '0') + "-" + String(dateParts[2]).padStart(2, '0');
        const date = new Date(valeurParametre);
        item.c[13] =date;

    });
    const jsonData = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);

            // Créer un lien de téléchargement pour le fichier JSON
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.json';
            document.body.appendChild(link);
            link.click();
  })
  .catch(error => {
    // Gestion des erreurs
    console.error('Une erreur s\'est produite : ', error);
});


// const date1 = new Date (2003,3,28,3,4,1)
// const date2 = new Date (2004,0,1,0,0,1)
// const date3 = new Date (2005,0,1,0,0,1)

// console.log(((Date.now()-date1)/1000).toFixed(0));
// console.log(date3-date2);


