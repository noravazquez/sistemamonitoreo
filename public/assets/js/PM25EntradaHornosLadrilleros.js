const ctxPM25EntradaHornosLadrilleros = document.getElementById('PM25EntradaHornosLadrilleros');

var chartPM25EntradaHornosLadrilleros = new Chart(ctxPM25EntradaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Material Particulado 2.5 entrada',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Material Particulado 2.5 entrada'
                }
            }
        }
    }
});
