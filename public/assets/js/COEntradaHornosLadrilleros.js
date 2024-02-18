const ctxCOEntradaHornosLadrilleros = document.getElementById('COEntradaHornosLadrilleros');

var chartCOEntradaHornosLadrilleros = new Chart(ctxCOEntradaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Monóxido de carbono entrada',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Monóxido de carbono entrada'
                }
            }
        }
    }
});
