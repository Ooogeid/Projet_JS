Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let myBarChart;

function createBarChart(labels, data) {
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

  if (myBarChart) {
    myBarChart.data.labels = labels;
    myBarChart.data.datasets[0].data = data;
    myBarChart.update();
  } else {
    const ctx = document.getElementById('myBarChart').getContext('2d');
    myBarChart = new Chart(ctx, {
      type: 'bar',
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
          display: false,
        },
        title: {
          display: true,
          text: 'Revenu moyen par plateforme de cloud',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return value + ' €';
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Revenu moyen (en euros)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Plateforme de cloud'
            }
          }]
        }
      }
    });
  }
}