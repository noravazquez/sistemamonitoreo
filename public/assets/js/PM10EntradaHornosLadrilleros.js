const ctxPM10EntradaHornosLadrilleros = document.getElementById('PM10EntradaHornosLadrilleros');

var chartPM10EntradaHornosLadrilleros = new Chart(ctxPM10EntradaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 10 entrada',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 10 entrada'
                }
            }
        }
    }
});
