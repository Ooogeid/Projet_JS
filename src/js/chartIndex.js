let myParticipantsChart;
fetch('http://localhost/survey_results_NA.json')
    .then(response => response.json())
        .then(dataNA => {
            // Charger les données Europe depuis l'URL
            fetch('http://localhost/survey_results_WE.json')
                .then(response => response.json())
                .then(dataEurope => {
               
                const allData = dataNA.concat(dataEurope);
                console.log(allData);
                // Appeler la fonction avec les données fusionnées
                chartNbParticipantsParPays(allData);

                })
                .catch(error => {
                    console.error('Erreur lors du chargement des données Europe:', error);
                });
        })
    .catch(error => {
    console.error('Erreur lors du chargement des données NA:', error);
});

function chartNbParticipantsParPays(data) {
    const participantsByCountry = new Map();

    // Calculer le nombre total de participants par pays
    data.forEach(entry => {
        const country = entry.Country;

        if (!participantsByCountry.has(country)) {
            participantsByCountry.set(country, 0);
        }

        // Ajouter le nombre de participants de cette entrée au total pour ce pays
        participantsByCountry.set(country, participantsByCountry.get(country) + 1);
    });

    const averageParticipantsByCountry = [];

    participantsByCountry.forEach((participants, country) => {
        averageParticipantsByCountry.push({
            country,
            participants
        });
    });

    // Tri des données par nombre de participants (ordre décroissant)
    averageParticipantsByCountry.sort((a, b) => {
        return b.participants - a.participants;
    });

    // Appeler la fonction de création du graphique avec les données traitées
    createNbParticipantsParPays(
        averageParticipantsByCountry.map(item => item.country),
        averageParticipantsByCountry.map(item => item.participants)
    );
}


function createNbParticipantsParPays(labels, data) {
    var myParticipantsChart = document.getElementById('myParticipantsChart').getContext('2d');
    return new Chart(myParticipantsChart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre moyen de participants par pays',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
