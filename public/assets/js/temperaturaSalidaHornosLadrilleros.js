const ctxTemperaturaSalidaHornosLadrilleros = document.getElementById('temperaturaSalidaHornosLadrilleros');

var chartTemperaturaSalidaHornosLadrilleros = new Chart(ctxTemperaturaSalidaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Temperatura salida °C',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperatura salida °C'
                }
            }
        }
    }
});
