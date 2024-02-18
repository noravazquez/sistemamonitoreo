const ctxTemperaturaHornosLadrilleros = document.getElementById('temperaturaHornosLadrilleros');

var chartTemperaturaHornosLadrilleros = new Chart(ctxTemperaturaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Temperatura entrada °C',
            data: []
        }, {
            type: 'line',
            label: 'Temperatura salida °C',
            data: [],
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
