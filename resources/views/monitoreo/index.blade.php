@extends('adminlte::page')

@section('title', 'Dashboard')

@section('content_header')
    <h1>Home</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Monitoreo humedad</h3>
                </div>
                <div class="card-body">
                    <img src="{{asset('assets/images/humedad.jpg')}}" alt="Humedad imagen" style="width: 100%; height: auto;"/>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Electrospinning</h3>
                </div>
                <div class="card-body">
                    <img src="{{asset('assets/images/electro.jpg')}}" alt="Electrospinning imagen" style="width: 100%; height: auto;"/>
                </div>
            </div>
        </div>
    </div>
@stop
