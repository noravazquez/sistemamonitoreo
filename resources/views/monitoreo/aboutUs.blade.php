@extends('adminlte::page')

@section('title', 'About Us')

@section('content_header')
    <h1>About Us</h1>
@stop

@section('content')
    @can('aboutUs')
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Información sobre nosotros.</h3>
            </div>
            <div class="card-body">
                <p class="h5">Lider del proyecto</p>
                <p><i class="fas fa-user"></i> Alejandro Espinosa Calderon <br> <span><i class="fas fa-envelope"></i> Correo electronico: </span>alejandro.espinosa@crodecelaya.edu.mx </p>
                <p class="h5">Auxiliares en el proyecto</p>
                <p><i class="fas fa-user"></i> Jose Antonio Ortiz Corona <br> <span><i class="fas fa-envelope"></i> Correo electronico: </span>antonio.ortiz@crodecelaya.edu.mx </p>
                <p><i class="fas fa-user"></i> Leopoldo Rangel Madrigal <br> <span><i class="fas fa-envelope"></i> Correo electronico: </span>leopoldo.rangel@crodecelaya.edu.mx </p>
                <p class="h5">Desarrollador del proyecto</p>
                <p><i class="fas fa-user"></i> Nora Samantha Vazquez Duran <br> <span><i class="fas fa-envelope"></i> Correo electronico: </span>vazquez.duran.norasamantha@gmail.com </p>
            </div>
        </div>
    @endcan
@stop
