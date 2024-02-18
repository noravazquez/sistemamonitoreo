const ctxTemperaturaEntradaHornosLadrilleros = document.getElementById('temperaturaEntradaHornosLadrilleros');

var chartTemperaturaEntradaHornosLadrilleros = new Chart(ctxTemperaturaEntradaHornosLadrilleros, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            type: 'line',
            label: 'Temperatura Entrada °C',
            data: []
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperatura Entrada °C'
                }
            }
        }
    }
});
