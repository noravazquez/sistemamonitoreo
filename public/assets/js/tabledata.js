$(document).ready(function () {
    let dataTable;

    $('#start-date').val('');
    $('#end-date').val('');

    $.ajax({
        url: '/datatopic/' + topic_id,
        type: 'GET',
        success: function (data) {
            dataTopic = data.data_topic;
            dataTable = tableData();
        },
        error: function (error) {
            console.log(error);
        }
    });

    $('#start-date, #end-date').on('input', function () {
        applyDateFilter();
    });

    function applyDateFilter() {
        const startDate = $('#start-date').val();
        const endDate = $('#end-date').val();

        $.ajax({
            url: '/datatopic/' + topic_id + '/' + startDate + '/' + endDate,
            type: 'GET',
            success: function (data) {
                dataTopic = data.data_topic;
                dataTable.clear().rows.add(dataTableData()).draw();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function tableData() {
        let title = null;
        let columnas = [];

        if (topic_id === 1) {
            title = 'Humedad Invernadero';
            columnas = [
                {title: "ID Humedad"},
                {title: "No. Humedad"},
                {title: "Valor Humedad"},
                {title: "Fecha"}
            ];
        }else if (topic_id === 2) {
            title = 'Electrospinning consola';
            columnas = [
                {title: "ID Consola"},
                {title: "Contenido consola"},
                {title: "Fecha"}
            ];
        }else if (topic_id === 3) {
            title = 'Electrospinning humedad';
            columnas = [
                {title: "ID humedad"},
                {title: "Valor humedad"},
                {title: "Fecha"}
            ];
        }else if (topic_id === 4) {
            title = 'Electrospinning temperatura';
            columnas = [
                {title: "ID temperatura"},
                {title: "Valor temperatura °C"},
                {title: "Fecha"}
            ];
        }

        return $('#example').DataTable({
            searching: false,
            dom: 'Bfrtip',
            lengthMenu: [
                [10, 25, 50, -1],
                ['10 rows', '25 rows', '50 rows', 'Show all']
            ],
            buttons: [
                'pageLength',
                {
                    extend: 'excelHtml5',
                    title: title
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    customize: function (doc) {
                        doc.content.splice(1, 0, {
                            margin: [0, 0, 0, 12],
                            alignment: 'center',
                            image: 'data:image/jpeg;base64,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',
                        });
                        doc.footer = function(page, pages) {
                            return {
                              margin: [15, 0, 15, 0],
                              height: 30,
                              columns: [{
                                alignment: "left",
                                text: 'Correo de contacto: alejandro.espinosa@crodecelaya.edu.mx',
                              }, {
                                alignment: "right",
                                text: [
                                  { text: page.toString(), italics: true },
                                    " de ",
                                  { text: pages.toString(), italics: true }
                                ]
                              }]
                            }
                        }
                    }
                }
            ],
            columns: columnas,
            data: dataTableData()
        });
    }

    function dataTableData() {
        if (topic_id === 1) {
            return dataTopic.map(function (item) {
                var jsonData = JSON.parse(item.data);
                return [
                    item.id,
                    String('Humedad ' + jsonData[1]),
                    jsonData[2],
                    item.created_at
                ];
            });
        }else if (topic_id === 2) {
            return dataTopic.map(function (item) {
                var jsonData = JSON.parse(item.data);
                return [
                    item.id,
                    jsonData,
                    item.created_at
                ];
            });
        }else if (topic_id === 3) {
            return dataTopic.map(function (item) {
                var jsonData = JSON.parse(item.data);
                return [
                    item.id,
                    jsonData,
                    item.created_at
                ];
            });
        }else if (topic_id === 4) {
            return dataTopic.map(function (item) {
                var jsonData = JSON.parse(item.data);
                return [
                    item.id,
                    String(jsonData + ' °C'),
                    item.created_at
                ];
            });
        }
    }
});
