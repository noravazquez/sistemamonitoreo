@extends('adminlte::page')

@section('title', 'Editar Topic')

@section('content_header')
    <h1>Editar Topic: {{$topic->nombre}}</h1>
@stop

@section('content')
<div class="card card-primary">
    <div class="card-header">
        <h3 class="card-title">Topic</h3>
    </div>

    @can('topics.update')
        <form action="{{route('topics.update', ['topic' => $topic->id])}}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="nombre">Nombre de la variable</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese nombre de la variable" value="{{$topic->nombre}}">
                    @error('nombre')
                        <span class="text-danger">{{$message}}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="nombre">Proyecto</label>
                    <input type="text" class="form-control" id="nombre_corto" name="nombre_corto" placeholder="Ingrese nombre del proyecto" value="{{$topic->nombre_corto}}">
                    @error('nombre_corto')
                        <span class="text-danger">{{$message}}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="configuration">Conexión MQTT</label>
                </div>
                <div class="form-group">
                    <select id="selectConfigurations" style="width: 400px;" name="configuration_id">
                        @foreach ($configurations as $c)
                            <option value="{{$c->id}}" @if ($c->id === $configuration->id) selected @endif>{{$c->nombre}}</option>
                        @endforeach
                    </select>
                    @error('configuration_id')
                        <span class="text-danger">{{$message}}</span>
                    @enderror
                </div>
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    @endcan
</div>
@stop

@section('css')
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
@stop
