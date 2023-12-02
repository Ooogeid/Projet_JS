
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let myLineChart;

function createHistogram2(labels, data) {
  if(myLineChart) {
    myLineChart.data.labels = labels;
    myLineChart.data.datasets[0].data = data;
    myLineChart.update();
  } else {
    const ctx = document.getElementById('myLineChart').getContext('2d');
    myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Salaires moyens par niveau d\'études',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
          responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                    display: true,
                    text: 'Salaire moyen (en euros)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Nivaux d\'études'
                  }
                }
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
