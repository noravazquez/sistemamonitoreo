let id_topic;
let id_configuration;
let mqttClientId;
let socket;

$(document).ready(function () {
    $('#selectTopics').select2({
        ajax:{
            url: 'selectTopics',
            dataType: 'json'
        }
    });

    $('#btnLoad').click(function () {
        let selected = $('#selectTopics').select2('data');

        if (selected.length) {
            id_topic = parseInt(selected[0].id);

            $('.chart').hide();
            $('#electrospinningConsola').hide();

            if (id_topic === 1) {
                $('#chartHumedad').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic === 2) {
                $('#electrospinningConsola').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic === 3) {
                $('#humedadElectrospinning').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic === 4) {
                $('#temperaturaElectrospinning').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 6) {
                $('#temperaturaEntradaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 7) {
                $('#COEntradaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 8) {
                $('#CO2EntradaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 9) {
                $('#PM1EntradaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 10) {
                $('#PM25EntradaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 11) {
                $('#PM10EntradaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 12) {
                $('#temperaturaSalidaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 13) {
                $('#COSalidaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 14) {
                $('#CO2SalidaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 15) {
                $('#PM1SalidaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 16) {
                $('#PM25SalidaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 17) {
                $('#PM10SalidaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 18) {
                $('#temperaturaHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 19) {
                $('#COHornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 20) {
                $('#CO2HornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 21) {
                $('#PM1HornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 22) {
                $('#PM25HornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic == 23) {
                $('#PM10HornosLadrilleros').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }

            closeWebSocket();

            $.ajax({
                url: '/configurationMqtt/'+id_topic,
                type: 'GET',
                success: function (data) {
                    let mqttConfig = {
                        host: data.result.url,
                        port: data.result.puerto,
                        topic: data.result.topic_nombre,
                        username: data.result.usuario,
                        password: data.result.contrasena
                    };

                    id_configuration = data.result.id_configuration;

                    $.ajax({
                        url: 'http://localhost:3000/subscriber',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(mqttConfig),
                        success: function (postData) {
                            mqttClientId = postData.mqttClientId;
                            connectionMqtt(mqttClientId);
                        },
                        error: function (postError) {
                            console.log('Error', postError);
                        }
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });
});

function connectionMqtt(mqttClientId) {
    let wsUrl = 'ws://localhost:3000/subscriber/' + mqttClientId;

    socket = new WebSocket(wsUrl);

    socket.onopen = function (event) {
        //console.log('Conexion WebSocket abierta: ', event);
    }

    socket.onmessage = function (event) {
        console.log('Mensaje recibido: ', event.data);
        var message = JSON.parse(event.data).message;

        if(id_topic === 1){
            var pattern = /_H(\d+)_(\d+)_/;
            message = message.match(pattern);

            var idHumedad = message[1];
            var humedad = message[2];
            var fechaFormateada = formatDate(new Date());

            var datasetIndex = 0;

            if (idHumedad == 1) {
                datasetIndex = 0;
            }else if (idHumedad == 3) {
                datasetIndex = 1;
            }

            chartHumedad.data.datasets[datasetIndex].data.push(humedad);
            chartHumedad.data.labels.push(fechaFormateada);

            if (chartHumedad.data.datasets[datasetIndex].data.length > 5) {
                chartHumedad.data.datasets[datasetIndex].data.shift();
            }

            if (chartHumedad.data.labels.length > 5) {
                chartHumedad.data.labels.shift();
            }

            chartHumedad.update();
        }else if (id_topic === 2) {
            $('#electrospinningConsola').text(message);
        }else if (id_topic === 3) {
            var humedadElectrospinning = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartHumedadElectrospinning.data.datasets[0].data.push(humedadElectrospinning);
            chartHumedadElectrospinning.data.labels.push(fechaFormateada);

            if (chartHumedadElectrospinning.data.datasets[0].data.length > 5) {
                chartHumedadElectrospinning.data.datasets[0].data.shift();
            }

            if (chartHumedadElectrospinning.data.labels.length > 5) {
                chartHumedadElectrospinning.data.labels.shift();
            }

            chartHumedadElectrospinning.update();
        }else if (id_topic === 4) {
            var temperaturaElectrospinning = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartTemperaturaElectrospinning.data.datasets[0].data.push(temperaturaElectrospinning);
            chartTemperaturaElectrospinning.data.labels.push(fechaFormateada);

            if (chartTemperaturaElectrospinning.data.datasets[0].data.length > 5) {
                chartTemperaturaElectrospinning.data.datasets[0].data.shift();
            }

            if (chartTemperaturaElectrospinning.data.labels.length > 5) {
                chartTemperaturaElectrospinning.data.labels.shift();
            }

            chartTemperaturaElectrospinning.update();
        }else if (id_topic === 6) {
            var temperaturaEntradaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartTemperaturaEntradaHornosLadrilleros.data.datasets[0].data.push(temperaturaEntradaHornosLadrilleros);
            chartTemperaturaEntradaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartTemperaturaEntradaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartTemperaturaEntradaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartTemperaturaEntradaHornosLadrilleros.data.labels.length > 5) {
                chartTemperaturaEntradaHornosLadrilleros.data.labels.shift();
            }

            chartTemperaturaEntradaHornosLadrilleros.update();
        }else if (id_topic === 7) {
            var COEntradaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartCOEntradaHornosLadrilleros.data.datasets[0].data.push(COEntradaHornosLadrilleros);
            chartCOEntradaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartCOEntradaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartCOEntradaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartCOEntradaHornosLadrilleros.data.labels.length > 5) {
                chartCOEntradaHornosLadrilleros.data.labels.shift();
            }

            chartCOEntradaHornosLadrilleros.update();
        }else if (id_topic === 8) {
            var CO2EntradaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartCO2EntradaHornosLadrilleros.data.datasets[0].data.push(CO2EntradaHornosLadrilleros);
            chartCO2EntradaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartCO2EntradaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartCO2EntradaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartCO2EntradaHornosLadrilleros.data.labels.length > 5) {
                chartCO2EntradaHornosLadrilleros.data.labels.shift();
            }

            chartCO2EntradaHornosLadrilleros.update();
        }else if (id_topic === 9) {
            var PM1EntradaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartPM1EntradaHornosLadrilleros.data.datasets[0].data.push(PM1EntradaHornosLadrilleros);
            chartPM1EntradaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM1EntradaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM1EntradaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM1EntradaHornosLadrilleros.data.labels.length > 5) {
                chartPM1EntradaHornosLadrilleros.data.labels.shift();
            }

            chartPM1EntradaHornosLadrilleros.update();
        }else if (id_topic === 10) {
            var PM25EntradaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartPM25EntradaHornosLadrilleros.data.datasets[0].data.push(PM25EntradaHornosLadrilleros);
            chartPM25EntradaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM25EntradaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM25EntradaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM25EntradaHornosLadrilleros.data.labels.length > 5) {
                chartPM25EntradaHornosLadrilleros.data.labels.shift();
            }

            chartPM25EntradaHornosLadrilleros.update();
        }else if (id_topic === 11) {
            var PM10EntradaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartPM10EntradaHornosLadrilleros.data.datasets[0].data.push(PM10EntradaHornosLadrilleros);
            chartPM10EntradaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM10EntradaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM10EntradaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM10EntradaHornosLadrilleros.data.labels.length > 5) {
                chartPM10EntradaHornosLadrilleros.data.labels.shift();
            }

            chartPM10EntradaHornosLadrilleros.update();
        }else if (id_topic === 12) {
            var temperaturaSalidaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartTemperaturaSalidaHornosLadrilleros.data.datasets[0].data.push(temperaturaSalidaHornosLadrilleros);
            chartTemperaturaSalidaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartTemperaturaSalidaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartTemperaturaSalidaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartTemperaturaSalidaHornosLadrilleros.data.labels.length > 5) {
                chartTemperaturaSalidaHornosLadrilleros.data.labels.shift();
            }

            chartTemperaturaSalidaHornosLadrilleros.update();
        }else if (id_topic === 13) {
            var COSalidaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartCOSalidaHornosLadrilleros.data.datasets[0].data.push(COSalidaHornosLadrilleros);
            chartCOSalidaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartCOSalidaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartCOSalidaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartCOSalidaHornosLadrilleros.data.labels.length > 5) {
                chartCOSalidaHornosLadrilleros.data.labels.shift();
            }

            chartCOSalidaHornosLadrilleros.update();
        }else if (id_topic === 14) {
            var CO2SalidaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartCO2SalidaHornosLadrilleros.data.datasets[0].data.push(CO2SalidaHornosLadrilleros);
            chartCO2SalidaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartCO2SalidaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartCO2SalidaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartCO2SalidaHornosLadrilleros.data.labels.length > 5) {
                chartCO2SalidaHornosLadrilleros.data.labels.shift();
            }

            chartCO2SalidaHornosLadrilleros.update();
        }else if (id_topic === 15) {
            var PM1SalidaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartPM1SalidaHornosLadrilleros.data.datasets[0].data.push(PM1SalidaHornosLadrilleros);
            chartPM1SalidaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM1SalidaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM1SalidaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM1SalidaHornosLadrilleros.data.labels.length > 5) {
                chartPM1SalidaHornosLadrilleros.data.labels.shift();
            }

            chartPM1SalidaHornosLadrilleros.update();
        }else if (id_topic === 16) {
            var PM25SalidaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartPM25SalidaHornosLadrilleros.data.datasets[0].data.push(PM25SalidaHornosLadrilleros);
            chartPM25SalidaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM25SalidaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM25SalidaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM25SalidaHornosLadrilleros.data.labels.length > 5) {
                chartPM25SalidaHornosLadrilleros.data.labels.shift();
            }

            chartPM25SalidaHornosLadrilleros.update();
        }else if (id_topic === 17) {
            var PM10SalidaHornosLadrilleros = parseFloat(message);
            var fechaFormateada = formatDate(new Date());

            chartPM10SalidaHornosLadrilleros.data.datasets[0].data.push(PM10SalidaHornosLadrilleros);
            chartPM10SalidaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM10SalidaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM10SalidaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM10SalidaHornosLadrilleros.data.labels.length > 5) {
                chartPM10SalidaHornosLadrilleros.data.labels.shift();
            }

            chartPM10SalidaHornosLadrilleros.update();
        }else if (id_topic === 18) {
            var pattern = /TempE_(\d+(?:\.\d+)?)_TempS_(\d+(?:\.\d+)?)/;
            message = message.match(pattern);

            var temperaturaEntradaHornosLadrilleros = parseFloat(message[1]);
            var temperaturaSalidaHornosLadrilleros = parseFloat(message[2]);
            var fechaFormateada = formatDate(new Date());

            chartTemperaturaHornosLadrilleros.data.datasets[0].data.push(temperaturaEntradaHornosLadrilleros);
            chartTemperaturaHornosLadrilleros.data.datasets[1].data.push(temperaturaSalidaHornosLadrilleros);
            chartTemperaturaHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartTemperaturaHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartTemperaturaHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartTemperaturaHornosLadrilleros.data.datasets[1].data.length > 5) {
                chartTemperaturaHornosLadrilleros.data.datasets[1].data.shift();
            }

            if (chartTemperaturaHornosLadrilleros.data.labels.length > 5) {
                chartTemperaturaHornosLadrilleros.data.labels.shift();
            }

            chartTemperaturaHornosLadrilleros.update();
        }else if (id_topic === 19) {
            var pattern = /COE_(\d+(?:\.\d+)?)_COS_(\d+(?:\.\d+)?)/;
            message = message.match(pattern);

            var COEntradaHornosLadrilleros = parseFloat(message[1]);
            var COSalidaHornosLadrilleros = parseFloat(message[2]);
            var fechaFormateada = formatDate(new Date());

            chartCOHornosLadrilleros.data.datasets[0].data.push(COEntradaHornosLadrilleros);
            chartCOHornosLadrilleros.data.datasets[1].data.push(COSalidaHornosLadrilleros);
            chartCOHornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartCOHornosLadrilleros.data.datasets[0].data.length > 5) {
                chartCOHornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartCOHornosLadrilleros.data.datasets[1].data.length > 5) {
                chartCOHornosLadrilleros.data.datasets[1].data.shift();
            }

            if (chartCOHornosLadrilleros.data.labels.length > 5) {
                chartCOHornosLadrilleros.data.labels.shift();
            }

            chartCOHornosLadrilleros.update();
        }else if (id_topic === 20) {
            var pattern = /CO2E_(\d+(?:\.\d+)?)_CO2S_(\d+(?:\.\d+)?)/;
            message = message.match(pattern);

            var CO2EntradaHornosLadrilleros = parseFloat(message[1]);
            var CO2SalidaHornosLadrilleros = parseFloat(message[2]);
            var fechaFormateada = formatDate(new Date());

            chartCO2HornosLadrilleros.data.datasets[0].data.push(CO2EntradaHornosLadrilleros);
            chartCO2HornosLadrilleros.data.datasets[1].data.push(CO2SalidaHornosLadrilleros);
            chartCO2HornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartCO2HornosLadrilleros.data.datasets[0].data.length > 5) {
                chartCO2HornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartCO2HornosLadrilleros.data.datasets[1].data.length > 5) {
                chartCO2HornosLadrilleros.data.datasets[1].data.shift();
            }

            if (chartCO2HornosLadrilleros.data.labels.length > 5) {
                chartCO2HornosLadrilleros.data.labels.shift();
            }

            chartCO2HornosLadrilleros.update();
        }else if (id_topic === 21) {
            var pattern = /PM1.0E_(\d+(?:\.\d+)?)_PM1.0S_(\d+(?:\.\d+)?)/;
            message = message.match(pattern);

            var PM1EntradaHornosLadrilleros = parseFloat(message[1]);
            var PM1SalidaHornosLadrilleros = parseFloat(message[2]);
            var fechaFormateada = formatDate(new Date());

            chartPM1HornosLadrilleros.data.datasets[0].data.push(PM1EntradaHornosLadrilleros);
            chartPM1HornosLadrilleros.data.datasets[1].data.push(PM1SalidaHornosLadrilleros);
            chartPM1HornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM1HornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM1HornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM1HornosLadrilleros.data.datasets[1].data.length > 5) {
                chartPM1HornosLadrilleros.data.datasets[1].data.shift();
            }

            if (chartPM1HornosLadrilleros.data.labels.length > 5) {
                chartPM1HornosLadrilleros.data.labels.shift();
            }

            chartPM1HornosLadrilleros.update();
        }else if (id_topic === 22) {
            var pattern = /PM2.5E_(\d+(?:\.\d+)?)_PM2.5S_(\d+(?:\.\d+)?)/;
            message = message.match(pattern);

            var PM25EntradaHornosLadrilleros = parseFloat(message[1]);
            var PM25SalidaHornosLadrilleros = parseFloat(message[2]);
            var fechaFormateada = formatDate(new Date());

            chartPM25HornosLadrilleros.data.datasets[0].data.push(PM25EntradaHornosLadrilleros);
            chartPM25HornosLadrilleros.data.datasets[1].data.push(PM25SalidaHornosLadrilleros);
            chartPM25HornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM25HornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM25HornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM25HornosLadrilleros.data.datasets[1].data.length > 5) {
                chartPM25HornosLadrilleros.data.datasets[1].data.shift();
            }

            if (chartPM25HornosLadrilleros.data.labels.length > 5) {
                chartPM25HornosLadrilleros.data.labels.shift();
            }

            chartPM25HornosLadrilleros.update();
        }else if (id_topic === 23) {
            var pattern = /PM10E_(\d+(?:\.\d+)?)_PM10S_(\d+(?:\.\d+)?)/;
            message = message.match(pattern);

            var PM10EntradaHornosLadrilleros = parseFloat(message[1]);
            var PM10SalidaHornosLadrilleros = parseFloat(message[2]);
            var fechaFormateada = formatDate(new Date());

            chartPM10HornosLadrilleros.data.datasets[0].data.push(PM10EntradaHornosLadrilleros);
            chartPM10HornosLadrilleros.data.datasets[1].data.push(PM10SalidaHornosLadrilleros);
            chartPM10HornosLadrilleros.data.labels.push(fechaFormateada);

            if (chartPM10HornosLadrilleros.data.datasets[0].data.length > 5) {
                chartPM10HornosLadrilleros.data.datasets[0].data.shift();
            }

            if (chartPM10HornosLadrilleros.data.datasets[1].data.length > 5) {
                chartPM10HornosLadrilleros.data.datasets[1].data.shift();
            }

            if (chartPM10HornosLadrilleros.data.labels.length > 5) {
                chartPM10HornosLadrilleros.data.labels.shift();
            }

            chartPM10HornosLadrilleros.update();
        }

        $.ajax({
            url: '/save/'+id_topic+'/'+id_configuration,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(message),
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
            success: function (data) {
                //console.log(data.result);
            },
            error: function (postError) {
                console.log('Error', postError);
            }
        });
    }

    socket.onerror = function (event) {
        console.log('Conexion WebSocket cerrada: ', event);
    }
}

function formatDate(date) {
    return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
}

function closeWebSocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
        socket = null;
    }
}
