const ctxCOSalidaHornosLadrilleros = document.getElementById('COSalidaHornosLadrilleros');

var chartCOSalidaHornosLadrilleros = new Chart(ctxCOSalidaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Monóxido de carbono salida',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Monóxido de carbono salida'
                }
            }
        }
    }
});
