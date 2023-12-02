// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let myPieChart;

function createPieChart(labels, data) {
    const colors = [
        '#007bff',
        '#dc3545',
        '#ffc107',
        '#28a745',
        '#ff00ff',
        '#00ffff',
        '#ffff00',
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ff7f00',
        '#7fff00',
        '#00ff7f',
        '#ff00ff',
        '#7f00ff',
        '#ff007f',
        '#00ff80',
        '#ff8000',
        '#0080ff',
        '#8000ff',
        '#ff80ff',
        '#80ffbf',
        '#80bfff',
        '#bf80ff',
        '#ffbf80',
        '#80ffcc',
      ];

    // Vérifier si le graphique existe déjà et le détruire avant de créer un nouveau
    if (myPieChart) {
        myPieChart.labels = labels;
        myPieChart.data.datasets[0].data = data;
        myPieChart.update();
    }
    else{
        const ctx = document.getElementById('myPieChart').getContext('2d');
        myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors.slice(0, labels.length),
        }],
        },
        options: {
        responsive: true,
        legend: {
            position: 'bottom',
        },
        tooltips: {
            callbacks: {
            label: function (tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                return data.labels[tooltipItem.index] + ': ' + currentValue + ' (' + percentage + '%)';
            }
            }
        }
        }
    });
    }
  
    
}