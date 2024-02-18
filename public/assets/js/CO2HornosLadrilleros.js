const ctxCO2HornosLadrilleros = document.getElementById('CO2HornosLadrilleros');

var chartCO2HornosLadrilleros = new Chart(ctxCO2HornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Dióxido de carbono entrada',
            data: []
        }, {
            type: 'line',
            label: 'Dióxido de carbono salida',
            data: [],
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Dióxido de carbono'
                }
            }
        }
    }
});
