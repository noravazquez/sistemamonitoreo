const ctxCOHornosLadrilleros = document.getElementById('COHornosLadrilleros');

var chartCOHornosLadrilleros = new Chart(ctxCOHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Monóxido de carbono entrada',
            data: []
        }, {
            type: 'line',
            label: 'Monóxido de carbono salida',
            data: [],
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Monóxido de carbono'
                }
            }
        }
    }
});
