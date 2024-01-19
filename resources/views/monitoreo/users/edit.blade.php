@extends('adminlte::page')

@section('title', 'Rol')

@section('content_header')
    <h1>Cambiar Rol: {{$user->name}}</h1>
@stop

@section('content')
<div class="card card-primary">
    <div class="card-header">
        <h3 class="card-title">Cambiar rol</h3>
    </div>
    @can('users.update')
        <form action="{{route('users.update', ['user' => $user->id])}}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="rol">Rol</label>
                </div>
                <div class="form-group">
                    <select id="selectRoles" style="width: 400px;" name="role_id">
                        @foreach ($roles as $r)
                            <option value="{{$r->id}}" @if ($r->id === $role[0]->id) selected @endif>{{$r->name}}</option>
                        @endforeach
                    </select>
                    @error('role_id')
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
