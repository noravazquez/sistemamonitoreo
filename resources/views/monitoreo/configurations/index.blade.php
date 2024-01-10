@extends('adminlte::page')

@section('title', 'Conexiones de MQTT')

@section('content_header')
    <h1>Conexiones de MQTT</h1>
@stop

@section('content')
    @if (session()->get('success'))
        <div class="alert alert-success text-center">
            {{ session()->get('success') }}
        </div>
    @endif
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="card">
        <div class="card-header">
            @can('configurations.create')
                <a href="{{route('configurations.create')}}" class="btn btn-outline-success">Nueva conexión</a>
            @endcan
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>URL</th>
                            <th>Puerto</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Estado</th>
                            <th>Creación</th>
                            <th>Actualización</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($configurations as $configuration)
                            <tr>
                                <td>{{$configuration->id}}</td>
                                <td>{{$configuration->nombre}}</td>
                                <td>{{$configuration->url}}</td>
                                <td>{{$configuration->puerto}}</td>
                                <td>{{$configuration->usuario}}</td>
                                <td>{{$configuration->contrasena}}</td>
                                <td>{{$configuration->state_id}}</td>
                                <td>{{$configuration->created_at}}</td>
                                <td>{{$configuration->updated_at}}</td>
                                <td>
                                    @can('configurations.edit')
                                        <a href="{{route('configurations.edit', $configuration)}}" class="btn btn-outline-primary btn-sm">Editar</a>
                                    @endcan
                                </td>
                                <td>
                                    @can('configurations.destroy')
                                        <form action="{{route('configurations.destroy', $configuration)}}" method="POST">
                                            @method('delete')
                                            @csrf
                                            <input type="submit" value="Eliminar" class="btn btn-outline-danger btn-sm">
                                        </form>
                                    @endcan
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@stop

@section('css')
    <style>
        .table-responsive {
            overflow-x: auto;
        }
    </style>
@stop

@section('js')
    <script> console.log('Hi!'); </script>
@stop
