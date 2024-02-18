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
            <canvas id="temperaturaEntradaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="COEntradaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="CO2EntradaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM1EntradaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM25EntradaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM10EntradaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="temperaturaSalidaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="COSalidaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="CO2SalidaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM1SalidaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM25SalidaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM10SalidaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="temperaturaHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="COHornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="CO2HornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM1HornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM25HornosLadrilleros" class="chart" style="display: none;"></canvas>
            <canvas id="PM10HornosLadrilleros" class="chart" style="display: none;"></canvas>
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
    <script src="{{asset('assets/js/CO2EntradaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/CO2HornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/CO2SalidaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/COEntradaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/COHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/COSalidaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM10EntradaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM10HornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM10SalidaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM1EntradaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM1HornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM1SalidaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM25EntradaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM25HornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/PM25SalidaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/temperaturaEntradaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/temperaturaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/temperaturaSalidaHornosLadrilleros.js')}}"></script>
    <script src="{{asset('assets/js/mqtt.js')}}"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        var csrf_token = '{{ csrf_token() }}';
    </script>
@stop
