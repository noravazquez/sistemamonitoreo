console.log(topic_id);

$(document).ready(function () {
    //const topic_id = mqttConfig.id_topic;
    console.log(topic_id);

    $.ajax({
        url: '/datatopic/' + topic_id,
        type: 'GET',
        success: function (data) {
            let dataSet = null;
            let title = null;
            let columnas = [];

            if (topic_id === 1) {
                const dataTopic = data.data_topic;

                dataSet = dataTopic.map(function (item) {
                    var jsonData = JSON.parse(item.data);
                    return[
                        item.id,
                        String('Humedad ' + jsonData[1]),
                        jsonData[2],
                        item.created_at
                    ];
                });
                title = 'Humedad Invernadero';
                columnas = [
                    {title: "ID Humedad"},
                    {title: "No. Humedad"},
                    {title: "Valor Humedad"},
                    {title: "Fecha"}
                ];
            }else if (topic_id === 2) {
                const dataTopic = data.data_topic;

                dataSet = dataTopic.map(function (item) {
                    console.log(item);
                    var jsonData = JSON.parse(item.data);
                    return[
                        item.id,
                        String('Consola ' + item.id),
                        jsonData,
                        item.created_at
                    ];
                })
                title = 'Electrospinning consola';
                columnas = [
                    {title: "ID Electrospinning"},
                    {title: "Consola numero"},
                    {title: "Contenido consola"},
                    {title: "Fecha"}
                ];
            }else if (topic_id === 3) {
                const dataTopic = data.data_topic;

                dataSet = dataTopic.map(function (item) {
                    console.log(item);
                    var jsonData = JSON.parse(item.data);
                    return[
                        item.id,
                        String('Humedad ' + item.id),
                        jsonData,
                        item.created_at
                    ];
                })
                title = 'Electrospinning humedad';
                columnas = [
                    {title: "ID humedad"},
                    {title: "Humedad numero"},
                    {title: "Valor humedad"},
                    {title: "Fecha"}
                ];
            }else if (topic_id === 4) {
                const dataTopic = data.data_topic;

                dataSet = dataTopic.map(function (item) {
                    console.log(item);
                    var jsonData = JSON.parse(item.data);
                    return[
                        item.id,
                        String('Temperatura ' + item.id),
                        jsonData,
                        item.created_at
                    ];
                })
                title = 'Electrospinning temperatura';
                columnas = [
                    {title: "ID temperatura"},
                    {title: "Temperatura numero"},
                    {title: "Valor temperatura"},
                    {title: "Fecha"}
                ];
            }


            $('#example').DataTable({
                dom: 'Bfrtip',
                lengthMenu: [
                    [ 10, 25, 50, -1 ],
                    [ '10 rows', '25 rows', '50 rows', 'Show all' ]
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
                        customize: function ( doc ) {
                            doc.content.splice( 1, 0, {
                                margin: [ 0, 0, 0, 12 ],
                                alignment: 'center',
                                image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABUCAMAAAAvQDDOAAAAA3NCSVQICAjb4U/gAAAC/VBMVEUBAA7ly3zNnSGFazBkSybe3d2ZmZmmairMzMy9omxMSUwzMzOYlIiSgmfw3MXDq5b/99+bbCLQyq+keEK9oFVQLiGKTCrfw3G+vsQvIRretWr28N64jCJiWlFaQiHlzp25m0lsanXAvbz///9aRy733LGsqJyKbk7br1ungno5Njq7uLT57stxa2vX08y1dyXw161rX0s3Jxr/+PXYpiCFSimQZCGooozmz5UhGRmUi33v7u7VrVLfvXNLQ0NtaGG5lFHaxYW0kTVsVDNzPSjNvJrx15zh1Mnl5udEMxr/+O/jriPgrEfx5tJZU1SFhYW2tLWofCHv373mzo57dXZ7Sin48eW+oIfeul7Qw6T379b25bQxKClyZFA5N0GOWyZmZmaZZjMoJCro160YEBfSu42JXSHFjTO8ikamo6TJollMPjGzgyHevXvpz4Tn28qZZmbVrUhvXEBDOjD65rzbozr43Z/kqTy8kVvVrF+zloeRjI2RaSumbTD29vKvrKyJXlDMmTPgxnspISHixZZzSCKGb0PMs5j//+TUv7D26MXv3rVCLRusezHftGPGqnDFsId+dmr3589nPySTYSthUziUWyt6USbVxrxZVVxDQELk4uHlxYxLPSjlwVjn1qDctUUMBQ3x0ZTGrH+qf2jboDPWpET/9tZ7en7ku2vv5+KLhYT978vOq1z///e8gzHjvoOGd1yIVkTBlCDtz3dCNSl9QimZmZnMmTNSS0z//+6HTjaafFWSYjLh1bmTh3Xg082FUiehnZ5BOTpxcXHDtZivjX7f4OPGxca5iFD+6LT69d9uY1d+Tkfw2KaeaypiXFvX1ta+n2OvczDn3tjWtVzGllDFva/89uTv1YwhGh5APUqcemzkxnL/7r3v5sa9jTF0VyfMmWakiFZ6ZEP39+aqpqaEWye1fDF7XRyCfX3ftVhPOiDlvE67k2jv3q7OxrI6Mi/NpDLktirPzb3owmAMChf/7Zw1KCBRSUSjcyKNUipuUiDlxYH313ng92lvAAAA/3RSTlP//////////////////////////////////////////////wD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9du23WAAAACXBIWXMAAOaHAADmhwFQDQN3AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEwLzE0LzEz4Gc54gAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAA0iSURBVFiF7Zh7VNNHFseh3WDwCbZbKEGpTLtrEThI1PIziNaKTbPyMMEshhQRqIgKloq2mhIKObaUCFp8VUBRXEEeBlup55CttgTUFFxIRLYQi6HtoiyrRRRdX+zZe+eXIJb0mO3ZP3vPgWTym/nk5s73ztwZBzLaKrdMonbmox2noZmw5pgHjxCtJChIBs1+rxIxvGhkPJ60QyTi8zXWcUqOty7TX4BvHUZTha/s3Lp3b/3VFe+7ujoTYnQ+ceKmjAiXp6UFq4mS+2p2agsh59arxeYCGa+nh28dV2QUwnsBx6i0iT16dytgV62a4+rqeoGQS/+c9RRgFfsPHmwXE67JuVMSQMjYT6rNvr48HlJZdzkcq1vAtYGdFrjXQl26dA0hsSz26P7r0dGI3V4apCak4ZOccpmM+srnszAMgwA8BYdtYRsD6+vrgXr/YeCEMPT2TzfTZCRifzTFqg4vxtgWDkwJieoRiZBKsUb472TwM+gwHAJb2G2U6rr0/sxzBLG3bqbxAHvbzc2M2JYWMyHJURGNg3zqq1SEHhbBP4OiSO/jDU7728SuoHFdui4Lp/zSqls3gxHb1ZWN2B0x/Wa2owbjKpLyejAGKAC/KqP3PS68ybQV221z5sy5v3Tp0nWeJyCKl54+mNbejFhHR8SeiVEXIJNGQKORSmXSYWydn8odETqbWHB1qqvnOk/PE+2IvZ4WDdi1jo6OBYANTReDfLk66mtR30WXAsQKhBCPuEgS5QcNvt4W9o37rksDmXUnTpx4yoNigz2kgE1NlVCsrxmwhVHQU0ScVDyXXB6S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',
                            } );
                        }
                    }
                ],
                columns: columnas,
                data: dataSet
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
});
