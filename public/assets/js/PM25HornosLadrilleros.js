const ctxPM25HornosLadrilleros = document.getElementById('PM25HornosLadrilleros');

var chartPM25HornosLadrilleros = new Chart(ctxPM25HornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 2.5 entrada',
            data: []
        }, {
            type: 'line',
            label: 'Material Particulado 2.5 salida',
            data: [],
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 2.5'
                }
            }
        }
    }
});
