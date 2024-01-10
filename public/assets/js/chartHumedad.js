const ctxHumedad = document.getElementById('chartHumedad');

var chartHumedad = new Chart(ctxHumedad, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Humedad 1',
            data: []
        }, {
            type: 'line',
            label: 'Humedad 2',
            data: [],
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Humedad'
                }
            }
        }
    }
});
