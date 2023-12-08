let myChart;

function createNbParticipantsParPays(labels, data) {
    var ctx = document.getElementById('myParticipantsChart').getContext('2d');
    
    // Assurez-vous d'ajuster le type de graphique en fonction de vos besoins (bar pour un graphique à barres)
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre moyen de participants par pays',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond des barres
                borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la bordure des barres
                borderWidth: 1 // Largeur de la bordure des barres
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
