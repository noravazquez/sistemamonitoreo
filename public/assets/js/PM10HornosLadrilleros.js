const ctxPM10HornosLadrilleros = document.getElementById('PM10HornosLadrilleros');

var chartPM10HornosLadrilleros = new Chart(ctxPM10HornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 10 entrada',
            data: []
        }, {
            type: 'line',
            label: 'Material Particulado 10 salida',
            data: [],
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 10'
                }
            }
        }
    }
});
