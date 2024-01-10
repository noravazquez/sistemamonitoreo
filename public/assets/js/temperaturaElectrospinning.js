const ctxTemperaturaElectrospinning = document.getElementById('temperaturaElectrospinning');

var chartTemperaturaElectrospinning = new Chart(ctxTemperaturaElectrospinning, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Temperatura',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperatura'
                }
            }
        }
    }
});
