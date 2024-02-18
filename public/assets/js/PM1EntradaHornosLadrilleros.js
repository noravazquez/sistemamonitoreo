const ctxPM1EntradaHornosLadrilleros = document.getElementById('PM1EntradaHornosLadrilleros');

var chartPM1EntradaHornosLadrilleros = new Chart(ctxPM1EntradaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 1.0 entrada',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 1.0 entrada'
                }
            }
        }
    }
});
