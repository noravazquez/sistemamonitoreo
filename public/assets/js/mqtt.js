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
            $('#pruebasHorno').hide();

            if (id_topic === 1) {
                $('#chartHumedad').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic === 2) {
                $('#electrospinningConsola').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
                //14:53:33 [!] Sistema detenido. Motivo: Paro general
            }else if (id_topic === 3) {
                $('#humedadElectrospinning').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic === 4) {
                $('#temperaturaElectrospinning').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }else if (id_topic === 5) {
                $('#pruebasHorno').show();
                $('#btnExportData').show();
                $('#btnExportData').attr('href', '/exportdata/' + id_topic);
            }

            closeWebSocket();

            $.ajax({
                url: '/configurationMqtt/'+id_topic,
                type: 'GET',
                success: function (data) {
                    console.log(data.result);
                    let mqttConfig = {
                        host: data.result.url,
                        port: data.result.puerto,
                        topic: data.result.topic_nombre,
                        username: data.result.usuario,
                        password: data.result.contrasena
                    };

                    id_configuration = data.result.id_configuration;

                    console.log(mqttConfig);

                    $.ajax({
                        url: 'http://localhost:3000/subscriber',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(mqttConfig),
                        success: function (postData) {
                            mqttClientId = postData.mqttClientId;
                            connectionMqtt(mqttClientId);
                            console.log(mqttClientId);
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
        console.log('Conexion WebSocket abierta: ', event);
    }

    socket.onmessage = function (event) {
        console.log('Mensaje recibido: ', event.data);
        var message = JSON.parse(event.data).message;


        if(id_topic === 1){
            var pattern = /_H(\d+)_(\d+)_/;
            message = message.match(pattern);
            console.log(message);

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
            console.log(message);
            $('#electrospinningConsola').text(message);
        }else if (id_topic === 3) {
            console.log(message)
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
        }else if (id_topic === 5) {
            console.log(message);
            $('#pruebasHorno').text(message);
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
                console.log(data.result);
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
        socket = null; // Limpia la variable global
    }
}
