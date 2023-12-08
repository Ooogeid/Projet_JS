Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let myFrameworkChart;

function createFrameworkChart(labels, data) {

  if (myFrameworkChart) {
    myFrameworkChart.data.labels = labels;
    myFrameworkChart.data.datasets[0].data = data;
    myFrameworkChart.update();
  } else {
    const ctx = document.getElementById('myFrameworkChart').getContext('2d');
    myFrameworkChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }],
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return value;
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Valeur'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Étiquette'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index];
            }
          }
        }
      }
    });
  }
}