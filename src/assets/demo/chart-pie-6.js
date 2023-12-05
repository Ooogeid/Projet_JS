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
                        '#FF5733',
                        '#FFD700'
                    ],
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                const dataset = data.datasets[tooltipItem.datasetIndex];
                                const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                                const currentValue = dataset.data[tooltipItem.index];
                                const percentage = ((currentValue / total) * 100).toFixed(2);
                                return data.labels[tooltipItem.index] + ': ' + currentValue + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}