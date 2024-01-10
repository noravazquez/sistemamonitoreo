@extends('adminlte::page')

@section('title', 'Agrear usuario')

@section('content_header')
    <h1>Agregar usuario al topic</h1>
@stop

@section('content')
<div class="card card-primary">
    <div class="card-header">
        <h3 class="card-title">Usuarios</h3>
    </div>
    <!-- /.card-header -->
    @can('saveUsers')
        <form action="{{route('saveUsers')}}" method="POST">
            @csrf
            <div class="card-body">
                <div class="form-group">
                    <label for="configuration">Usuarios</label>
                </div>
                <div class="form-group">
                    <select id="selectUsers" style="width: 400px;" name="user_id"></select>
                    @error('user_id')
                        <span class="text-danger">{{$message}}</span>
                    @enderror
                </div>
                <div>
                    <input type="hidden" class="form-control" id="topic_id" name="topic_id" value={{$topic_id}}>
                </div>
            </div>
            <!-- /.card-body -->
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

@section('js')
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script>
    $(document).ready(function () {
        var topicId = $('#topic_id').val();
        $('#selectUsers').select2({
            placeholder: 'Select an option',
            ajax:{
                url: '/selectUsers/' + topicId,
                dataType: 'json'
            }
        });
    });
</script>
@stop
