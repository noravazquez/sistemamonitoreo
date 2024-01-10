<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\MyEvent;
use App\Models\Temperature;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PhpMqtt\Client\ConnectionSettings;
use PhpMqtt\Client\MqttClient;

use function Laravel\Prompts\spin;

class MqttListener extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mqtt-listener';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $fileData = Storage::get('config/mqtt_config.json');
        $mqttConfig = json_decode($fileData, true);

        $server = $mqttConfig['url'];
        $port = $mqttConfig['puerto'];
        $username = $mqttConfig['usuario'];
        $password = $mqttConfig['contrasena'];
        $topicFilter = $mqttConfig['topic_nombre'];

        $client = new MqttClient($server, $port, null, MqttClient::MQTT_3_1);

        $connectionSettings = (new ConnectionSettings)->setUsername($username)->setPassword($password);

        $client->connect($connectionSettings, true);

        echo sprintf('Client connected: ');

        $client->subscribe($topicFilter, function($topic, $message){
            echo sprintf('Received message on topic [%s]: %s', $topic, $message);
            $fileData = Storage::get('config/mqtt_config.json');
            $mqttConfig = json_decode($fileData, true);
            $topic_id = $mqttConfig['id_topic'];
            $configuration_id = $mqttConfig['id_configuration'];
            $name_table = 'data_topic_'.$topic_id;
            $current_date_time = date('Y-m-d H:i:s');

            $jsonData = json_decode($message);

            if ($jsonData == null) {
                echo sprintf(' No es json');
                $pattern ="/_H(\d+)_(\d+)_/";
                preg_match($pattern, $message, $data);
                $message = json_encode($data);
                echo sprintf($message);
            }

            /*echo sprintf('Nombre tabla: '.$name_table);
            echo sprintf('Data: '.$message);
            echo sprintf('Id topic: '.$topic_id);
            echo sprintf('Id configuration: '.$configuration_id);
            echo sprintf('Date: '.$current_date_time);*/

            DB::table($name_table)->insert(
                array(
                    'data' => $message,
                    'topic_id' => $topic_id,
                    'configuration_id' => $configuration_id,
                    'created_at' => $current_date_time,
                    'updated_at' => $current_date_time
                )
            );
            event(new MyEvent($message));
        }, 2);

        $client->loop(true);
        return Command::SUCCESS;
    }
}
