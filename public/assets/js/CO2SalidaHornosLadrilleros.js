const ctxCO2SalidaHornosLadrilleros = document.getElementById('CO2SalidaHornosLadrilleros');

var chartCO2SalidaHornosLadrilleros = new Chart(ctxCO2SalidaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Dióxido de carbono salida',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Dióxido de carbono salida'
                }
            }
        }
    }
});
