const ctxPM10SalidaHornosLadrilleros = document.getElementById('PM10SalidaHornosLadrilleros');

var chartPM10SalidaHornosLadrilleros = new Chart(ctxPM10SalidaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 10 salida',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 10 salida'
                }
            }
        }
    }
});
