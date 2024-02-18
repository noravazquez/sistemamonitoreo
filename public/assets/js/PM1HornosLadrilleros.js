const ctxPM1HornosLadrilleros = document.getElementById('PM1HornosLadrilleros');

var chartPM1HornosLadrilleros = new Chart(ctxPM1HornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 1.0 entrada',
            data: []
        }, {
            type: 'line',
            label: 'Material Particulado 1.0 salida',
            data: [],
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 1.0'
                }
            }
        }
    }
});
