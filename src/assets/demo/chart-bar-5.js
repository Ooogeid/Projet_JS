let myOSChart;

function createMyOSChart(labels, data) {

    if (myOSChart) {
        myOSChart.data.labels = labels;
        myOSChart.data.datasets[0].data = data;
        myOSChart.update();
    } else {
        const ctx = document.getElementById('myOSChart').getContext('2d');
        myOSChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Utilisation',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            precision: 0,
                            suggestedMax: Math.max(...data) + 1 // Ajuster la valeur maximale de l'axe Y
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Utilisation'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Système d\'exploitation'
                        }
                    }]
                },
                legend: {
                    onClick: function (e) {
                        e.stopPropagation();
                    }
                }
            }
        });
    }
}