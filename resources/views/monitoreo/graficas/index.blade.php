@extends('adminlte::page')

@section('title', 'Gráfica')

@section('content_header')
    <h1>Gráfica</h1>
@stop

@section('content')
<p style="display: none">
    <?php
        if (Storage::exists('config/mqtt_config.json')) {
            $fileData = Storage::get('config/mqtt_config.json');
            $mqttConfig = json_decode($fileData, true);
        }else {
            echo 'El archivo no existe';
        }
    ?>
</p>

<div class="card">
    <div class="card-header">
        <div class="card-tools">
            <div style="text-align: center">
                @can('selectTopics')
                    <select id="selectTopics" style="width: 400px;"></select>
                    <button type="button" class="btn btn-outline-primary btn-sm" id="btnLoad">Graficar</button>
                @endcan
            </div>
        </div>
    </div>

    <div class="card-body">
        <div>
            <canvas id="chartHumedad" class="chart" style="display: none;"></canvas>
            <p id="electrospinningConsola" style="display: none;"></p>
            <canvas id="humedadElectrospinning" class="chart" style="display: none;"></canvas>
            <canvas id="temperaturaElectrospinning" class="chart" style="display: none;"></canvas>
        </div>
    </div>

    <div class="card-footer">
        <div style="text-align: center">
            @can('exportdata')
                <a type="button" class="btn btn-outline-primary btn-lg" id="btnExportData" style="display: none;">Exportar Datos</a>
            @endcan
        </div>
    </div>

</div>
@stop

@section('css')
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
@stop

@section('js')
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{asset('assets/js/chartHumedad.js')}}"></script>
    <script src="{{asset('assets/js/humedadElectrospinning.js')}}"></script>
    <script src="{{asset('assets/js/temperaturaElectrospinning.js')}}"></script>
    <script src="{{asset('assets/js/mqtt.js')}}"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        var csrf_token = '{{ csrf_token() }}';
    </script>
@stop
