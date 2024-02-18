const ctxPM25SalidaHornosLadrilleros = document.getElementById('PM25SalidaHornosLadrilleros');

var chartPM25SalidaHornosLadrilleros = new Chart(ctxPM25SalidaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 2.5 salida',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 2.5 salida'
                }
            }
        }
    }
});
