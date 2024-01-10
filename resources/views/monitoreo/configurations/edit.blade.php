@extends('adminlte::page')

@section('title', 'Editar Conexión MQTT')

@section('content_header')
    <h1>Editar Conexión MQTT: {{$configuration->nombre}}</h1>
@stop

@section('content')
    <div class="card card-primary">
        <div class="card-header">
            <h3 class="card-title">Configuración MQTT</h3>
        </div>
        <!-- /.card-header -->
        @can('configurations.update')
            <form action="{{route('configurations.update', ['configuration' => $configuration->id])}}" method="POST">
                @csrf
                @method('PUT')
                <div class="card-body">
                    <div class="form-group">
                        <label for="nombre">Nombre MQTT</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese nombre de la conexión MQTT" value="{{$configuration->nombre}}">
                        @error('nombre')
                            <span class="text-danger">{{$message}}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="url">URL</label>
                        <input type="text" class="form-control" id="url" name="url" placeholder="Ingrese la URL del servidor MQTT" value="{{$configuration->url}}">
                        @error('url')
                            <span class="text-danger">{{$message}}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="puerto">Puerto</label>
                        <input type="number" class="form-control" id="puerto" name="puerto" placeholder="Ingrese el puerto del servidor MQTT" value="{{$configuration->puerto}}">
                        @error('puerto')
                            <span class="text-danger">{{$message}}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="usuario">Usuario</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Ingrese el usuario para la conexión con MQTT" value="{{$configuration->usuario}}">
                        @error('usuario')
                            <span class="text-danger">{{$message}}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="contrasena">Contraseña</label>
                        <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="Ingrese la contraseña del servidor MQTT" value="{{$configuration->contrasena}}">
                        @error('contrasena')
                            <span class="text-danger">{{$message}}</span>
                        @enderror
                    </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
            </form>
        @endcan
    </div>
@stop

@section('css')
    <link rel="stylesheet" href="/css/admin_custom.css">
@stop

@section('js')
    <script> console.log('Hi!'); </script>
@stop
