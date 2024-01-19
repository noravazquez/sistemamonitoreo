@extends('adminlte::page')

@section('title', 'Topics')

@section('content_header')
    <h1>Topics</h1>
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
            @can('topics.create')
                <a href="{{route('topics.create')}}" class="btn btn-outline-success">Nuevo topic</a>
            @endcan
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre variable</th>
                            <th>Proyecto</th>
                            <th>Conexión MQTT</th>
                            <th>Creación</th>
                            <th>Actualización</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($topics as $topic)
                            <tr>
                                <td>{{$topic->id}}</td>
                                <td>{{$topic->nombre}}</td>
                                <td>{{$topic->nombre_corto}}</td>
                                <td>{{$topic->configuration_id}}</td>
                                <td>{{$topic->created_at}}</td>
                                <td>{{$topic->updated_at}}</td>
                                <td>
                                    @can('topic')
                                        <a href="{{route('topic', ['topic_id' => $topic->id])}}" class="btn btn-outline-secondary btn-sm">Usuarios</a>
                                    @endcan
                                </td>
                                <td>
                                    @can('topics.edit')
                                        <a href="{{route('topics.edit', $topic)}}" class="btn btn-outline-primary btn-sm">Editar</a>
                                    @endcan
                                </td>
                                <td>
                                    @can('topics.destroy')
                                        <form action="{{route('topics.destroy', $topic)}}" method="POST">
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
