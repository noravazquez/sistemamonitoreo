const ctxHumedadElectrospinning = document.getElementById('humedadElectrospinning');

var chartHumedadElectrospinning = new Chart(ctxHumedadElectrospinning, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Humedad',
            data: []
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
