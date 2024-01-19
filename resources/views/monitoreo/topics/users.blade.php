@extends('adminlte::page')

@section('title', 'Usuarios del topic')

@section('content_header')
    <h1>Usuarios del Topic: {{$topic->nombre_corto}}</h1>
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
        @can('addUsers')
            <a href="{{route('addUsers', ['topic_id' => $topic_id])}}" class="btn btn-outline-success">Agregar usuario</a>
        @endcan
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo Electronico</th>
                        <th>Creación</th>
                        <th>Actualización</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                        <tr>
                            <td>{{$user->id}}</td>
                            <td>{{$user->name}}</td>
                            <td>{{$user->email}}</td>
                            <td>{{$user->created_at}}</td>
                            <td>{{$user->updated_at}}</td>
                            <td>
                                @can('deleteUsers')
                                    <form action="{{route('deleteUsers', ['topic_id' => $topic_id, 'user_id' => $user->id])}}" method="POST">
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
