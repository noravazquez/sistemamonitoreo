const ctxCO2EntradaHornosLadrilleros = document.getElementById('CO2EntradaHornosLadrilleros');

var chartCO2EntradaHornosLadrilleros = new Chart(ctxCO2EntradaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Dióxido de carbono entrada',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Dióxido de carbono entrada'
                }
            }
        }
    }
});
