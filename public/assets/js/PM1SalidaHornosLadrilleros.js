const ctxPM1SalidaHornosLadrilleros = document.getElementById('PM1SalidaHornosLadrilleros');

var chartPM1SalidaHornosLadrilleros = new Chart(ctxPM1SalidaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 1.0 salida',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 1.0 salida'
                }
            }
        }
    }
});
