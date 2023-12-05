Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let myHistogramChart1;

function createHistogram1(labels, data) {
    if (myHistogramChart1) {
    // Si le graphique existe déjà, mettez à jour les données
    myHistogramChart1.data.labels = labels;
    myHistogramChart1.data.datasets[0].data = data;
    myHistogramChart1.update();
    } else {
        // Si le graphique n'existe pas, on le crée
        var ctx = document.getElementById("myHistogramChart1");
        myHistogramChart1 = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: labels,
            datasets: [{
                label: "Salaire moyen par tranche d'expérience",
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Couleur de fond des barres
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
            },
            options: {
            scales: {
                xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Tranche d\'expérience (années)'
                }
                }],
                yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Salaire moyen en euros'
                },
                ticks: {
                    beginAtZero: true
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