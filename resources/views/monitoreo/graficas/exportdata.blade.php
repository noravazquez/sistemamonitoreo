@extends('adminlte::page')

@section('title', 'Export Data')

@section('content_header')
    <h1>Data</h1>
@stop

@section('content')
<?php
    echo '<script>';
    echo 'var topic_id = ' . $topic_id . ';';
    echo '</script>';
?>

    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Export data</h3>
            @can('filterData')
                <div class="card-tools d-flex justify-content-center align-items-center">
                    <label for="start-date" class="mr-1">Inicio</label>
                    <input class="form-control form-control-sm mr-1" type="text" id="start-date" name="start-date">

                    <label for="end-date" class="mr-1">Fin</label>
                    <input class="form-control form-control-sm mr-1" type="text" id="end-date" name="end-date">
                </div>
            @endcan
        </div>

        <div class="card-body">
            <div class="table-responsive">
                @can('exportdata')
                    <table id="example" class="display nowrap" style="width:100%"></table>
                @endcan
            </div>
        </div>
    </div>
@stop

@section('css')
    <link href="https://cdn.datatables.net/v/dt/dt-1.13.7/datatables.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css">
@stop

@section('js')
    <script src="https://cdn.datatables.net/v/dt/dt-1.13.7/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
    <script src="{{asset("assets/js/tabledata.js")}}"></script>
@stop
