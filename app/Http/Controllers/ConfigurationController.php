<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
    public function __construct()
    {
       $this->middleware('can:configurations.index')->only('index');
       $this->middleware('can:configurations.create')->only('create');
       $this->middleware('can:configurations.store')->only('store');
       $this->middleware('can:configurations.edit')->only('edit');
       $this->middleware('can:configurations.update')->only('update');
       $this->middleware('can:configurations.destroy')->only('destroy');
    }

    public function index()
    {
        $configurations = Configuration::all();
        return view('monitoreo.configurations.index', compact('configurations'));
    }

    public function create()
    {
        return view('monitoreo.configurations.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|max:100',
            'url' => 'required|max:250',
            'puerto' => 'required|numeric',
            'usuario' => 'required|max:100',
            'contrasena' => 'required|min:8|max:50'
        ],[
            'nombre.required' => 'Por favor ingrese un nombre para la conexión.',
            'nombre.max' => 'Máximo 50 caracteres.',
            'url.required' => 'Por favor ingrese la URL de la conexión.',
            'url.max' => 'Máximo 250 caracteres.',
            'puerto.required' => 'Por favor ingrese el puerto para la conexión.',
            'puerto.numeric' => 'El puerto debe de ser un numero.',
            'usuario.required' => 'Por favor ingrese un usuario.',
            'usuario.max' => 'Máximo 100 caracteres',
            'contrasena.required' => 'Por favor ingrese una contraseña',
            'contrasena.min' => 'La contraseña debe tener un minimo de 8 caracteres',
            'contrasena.max' => 'Máximo 50 caracteres'
        ]);
        $configuration = new Configuration();

        $configuration->nombre = $request->nombre;
        $configuration->url = $request->url;
        $configuration->puerto = $request->puerto;
        $configuration->usuario = $request->usuario;
        $configuration->contrasena = $request->contrasena;
        $configuration->state_id = 1;
        $configuration->save();

        return redirect()->route("configurations.index")->with('success', 'La conexión fue agregada exitosamente.');
    }

    public function edit(Configuration $configuration)
    {
        return view('monitoreo.configurations.edit', compact('configuration'));
    }

    public function update(Request $request, Configuration $configuration)
    {
        $request->validate([
            'nombre' => 'required|max:100',
            'url' => 'required|max:250',
            'puerto' => 'required|numeric',
            'usuario' => 'required|max:100',
            'contrasena' => 'required|min:8|max:50'
        ],[
            'nombre.required' => 'Por favor ingrese un nombre para la conexión.',
            'nombre.max' => 'Máximo 50 caracteres.',
            'url.required' => 'Por favor ingrese la URL de la conexión.',
            'url.max' => 'Máximo 250 caracteres.',
            'puerto.required' => 'Por favor ingrese el puerto para la conexión.',
            'puerto.numeric' => 'El puerto debe de ser un numero.',
            'usuario.required' => 'Por favor ingrese un usuario.',
            'usuario.max' => 'Máximo 100 caracteres',
            'contrasena.required' => 'Por favor ingrese una contraseña',
            'contrasena.min' => 'La contraseña debe tener un minimo de 8 caracteres',
            'contrasena.max' => 'Máximo 50 caracteres'
        ]);

        $configuration->update([
            'nombre' => $request->nombre,
            'url' => $request->url,
            'puerto' => $request->puerto,
            'usuario' => $request->usuario,
            'contrasena' => $request->contrasena,
            'state_id' => 1,
        ]);

        return redirect()->route("configurations.index")->with('success', 'La conexión fue actualizada exitosamente.');
    }

    public function destroy(Configuration $configuration)
    {
        $configuration->delete();
        return redirect()->route("configurations.index")->with('success', 'La conexión fue borrada exitosamente.');
    }
}
