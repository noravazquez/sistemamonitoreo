<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TopicController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('can:topics.index')->only('index');
        $this->middleware('can:topics.create')->only('create');
        $this->middleware('can:topics.store')->only('store');
        $this->middleware('can:topics.edit')->only('edit');
        $this->middleware('can:topics.update')->only('update');
        $this->middleware('can:topics.destroy')->only('destroy');
    }

    public function index()
    {
        $user_id = Auth::id();
        $topics = Topic::join('topic_user', 'topics.id', '=', 'topic_user.topic_id')
            ->join('users', 'topic_user.user_id', '=', 'users.id')
            ->where('users.id', $user_id)
            ->select('topics.*')
            ->get();
        if (request()->ajax()) {
            return response()->json($topics);
        }
        return view ('monitoreo.topics.index', compact('topics'));
    }

    public function create()
    {
        return view('monitoreo.topics.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|max:250',
            'nombre_corto' => 'required|max:250',
            'configuration_id' => 'required'
        ],[
            'nombre.required' => 'Por favor ingrese un nombre para el Topic.',
            'nombre.max' => 'Maximo 250 caracteres.',
            'nombre_corto.required' => 'Por favor ingrese un nombre para identificar el Topic.',
            'nombre_corto.max' => 'Maximo 250 caracteres',
            'configuration_id.required' => 'Por favor seleccione una configuracion MQTT a la que pertenecera el Topic.'
        ]);
        $topic = new Topic();

        $topic->nombre = $request->nombre;
        $topic->nombre_corto = $request->nombre_corto;
        $topic->configuration_id = $request->configuration_id;

        $topic->save();

        DB::table('topic_user')->insert([
            'user_id' => Auth::id(),
            'topic_id' => $topic->id,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $name_table = 'data_topic_'.$topic->id;
        Schema::create($name_table, function($table)
        {
            $table->increments('id');
            $table->json('data');
            $table->unsignedBigInteger('topic_id');
            $table->foreign('topic_id')->references('id')->on('topics')->onUpdate('cascade');
            $table->unsignedBigInteger('configuration_id');
            $table->foreign('configuration_id')->references('id')->on('configurations')->onUpdate('cascade');
            $table->timestamps();
        });

        return redirect()->route('topics.index')->with('success', 'El topic se agrego exitosamente.');
    }

    public function edit(Topic $topic)
    {
        $configurations = Configuration::all();
        $configuration = Configuration::find($topic->configuration_id);
        return view('monitoreo.topics.edit', compact('topic', 'configuration', 'configurations'));
    }

    public function update(Request $request, Topic $topic)
    {
        $request->validate([
            'nombre' => 'required|max:250',
            'nombre_corto' => 'required|max:250',
            'configuration_id' => 'required'
        ],[
            'nombre.required' => 'Por favor ingrese un nombre para el Topic.',
            'nombre.max' => 'Maximo 250 caracteres.',
            'nombre_corto.required' => 'Por favor ingrese un nombre para identificar el Topic.',
            'nombre_corto.max' => 'Maximo 250 caracteres',
            'configuration_id.required' => 'Por favor seleccione una configuracion MQTT a la que pertenecera el Topic.'
        ]);

        $topic->update([
            'nombre' => $request->nombre,
            'nombre_corto' => $request->nombre_corto,
            'configuration_id' => $request->configuration_id
        ]);

        return redirect()->route("topics.index")->with('success', 'El Topic fue actualizado correctamente.');
    }

    public function destroy(Topic $topic)
    {
        $name_table = 'data_topic_'.$topic->id;
        Schema::dropIfExists($name_table);
        DB::table('topic_user')->where('topic_id', $topic->id)->delete();
        $topic->delete();
        return redirect()->route("topics.index")->with('success', 'El Topic fue borrado exitosamente.');
    }
}
