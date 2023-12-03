let myCommunicationChart;

function createCommunicationChart(labels, data) {
    if (myCommunicationChart) {
    myCommunicationChart.data.labels = labels;
    myCommunicationChart.data.datasets[0].data = data;
    myCommunicationChart.update();
    } else {
        const ctx = document.getElementById('myCommunicationChart').getContext('2d');
        myCommunicationChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    // Ajoutez plus de couleurs d'arrière-plan si nécessaire
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    // Assurez-vous d'avoir les mêmes couleurs d'arrière-plan que dans backgroundColor
                    ]
                }]
            },
            options: {
                responsive: true, // Rendre le graphique responsive
                maintainAspectRatio: false, // Ne pas conserver le ratio hauteur/largeur
                plugins: {
                    legend: {
                    position: 'bottom', // Position de la légende : 'top', 'bottom', 'left', 'right'
                    },
                    tooltip: {
                    callbacks: {
                        label: function (context) {
                        // Personnalisation de l'affichage des valeurs dans les tooltips
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return label + ': ' + value;
                        }
                    }
                    }
                }
            }
    });
    }
}