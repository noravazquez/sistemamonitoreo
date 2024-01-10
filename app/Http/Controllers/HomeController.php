<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('monitoreo.index');
    }

    public function getTopics(Request $request){
        $user_id = Auth::id();

        $topics = Topic::join('topic_user', 'topics.id', '=', 'topic_user.topic_id')
            ->join('users', 'topic_user.user_id', '=', 'users.id')
            ->where('users.id', $user_id)
            ->when(!is_null($request->input("term")), function ($query) use ($request) {
                $query->where("topics.nombre_corto", "LIKE", '%'.$request->input("term").'%');
            })
            ->select('topics.id', 'topics.nombre_corto as text')
            ->get();
        return response()->json(["results"=>$topics]);
    }

    public function getConfiguration($topic_id){
        $topic = Topic::with('configuration')->find($topic_id);
        $configuration = $topic->configuration;
        $mqttConfig = [
            "id_topic" => $topic->id,
            "topic_nombre" => $topic->nombre,
            "id_configuration" => $configuration->id,
            "configuration_nombre" => $configuration->nombre,
            "url" => $configuration->url,
            "puerto" => $configuration->puerto,
            "usuario" => $configuration->usuario,
            "contrasena" => $configuration->contrasena
        ];
        $fileData = json_encode($mqttConfig);
        Storage::put('config/mqtt_config.json', $fileData);
        //Artisan::queue('app:mqtt-listener');
        return response()->json([
            "result" => [
                "id_topic" => $topic->id,
                "topic_nombre" => $topic->nombre,
                "id_configuration" => $configuration->id,
                "configuration_nombre" => $configuration->nombre,
                "url" => $configuration->url,
                "puerto" => $configuration->puerto,
                "usuario" => $configuration->usuario,
                "contrasena" => $configuration->contrasena
            ]
        ]);
    }

    public function topicUsers($topic_id){
        $users = DB::table('users')
        ->join('topic_user', 'users.id', '=', 'topic_user.user_id')
        ->join('topics', 'topic_user.topic_id', '=', 'topics.id')
        ->where('topics.id', $topic_id)
        ->select('users.*')
        ->get();
        return view('monitoreo.topics.users', compact('users', 'topic_id'));
    }

    public function addUsers($topic_id){
        return view('monitoreo.topics.addUser', compact('topic_id'));
    }

    public function saveUsers(Request $request){
        $request->validate([
            'user_id' => 'required',
            'topic_id' => 'required',
        ]);
        DB::table('topic_user')->insert([
            'user_id' => $request->input('user_id'),
            'topic_id' => $request->input('topic_id'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
        return redirect()->route('topic', ['topic_id' => $request->input('topic_id')])->with('success', 'El usuario fue agregado correctamente.');
    }

    public function deleteUsers($topic_id, $user_id){
        DB::table('topic_user')->where('user_id', $user_id)->where('topic_id', $topic_id)->delete();
        return redirect()->route('topic', ['topic_id' => $topic_id])->with('success', 'El Usuario fue borrado exitosamente.');
    }

    public function selectUsers(Request $request, $topic_id){
        $users = User::whereNotIn('id', function ($query) use ($topic_id) {
            $query->select('tu.user_id')
                ->from('topic_user as tu')
                ->where('tu.topic_id', $topic_id);
        })->when(!is_null($request->input("term")), function ($query) use ($request) {
            $query->where("name", "LIKE", '%'.$request->input("term").'%');
        })->select('name as text', 'id')->get();

        return response()->json(["results" => $users]);
    }


    public function getConfigurations(Request $request){
        $configurations = (is_null($request->input("term"))
            ? Configuration::select('nombre as text', 'id')->get()
            : Configuration::where("nombre", "LIKE", '%'.$request->input("term").'%')->select('nombre as text', 'id')->get()
        );
        return response()->json(["results"=>$configurations]);
    }

    public function exportData($topic_id){
        return view('monitoreo.graficas.exportdata', compact('topic_id'));
    }

    public function getDataTopic($topic_id){
        $nombre_tabla = "data_topic_".strval($topic_id);
        $data_topic = DB::table($nombre_tabla)->get();

        return response()->json(["data_topic"=>$data_topic]);
    }

    public function grafica(){
        return view('monitoreo.graficas.index');
    }

    public function saveDB(Request $request, $topic_id, $configuration_id){
        try {
            $tableName = "data_topic_$topic_id";
            if (Schema::hasTable($tableName)) {
                DB::table($tableName)->insert([
                    'data' => json_encode($request->all()),
                    'topic_id' => $topic_id,
                    'configuration_id' => $configuration_id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                return response()->json(['result' => 'Datos guardados correctamente']);
            } else {
                return response()->json(['error' => 'La tabla no existe'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }
}
