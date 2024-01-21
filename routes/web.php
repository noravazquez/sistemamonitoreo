<?php

use App\Http\Controllers\ConfigurationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Auth::routes();

Route::get('/', [HomeController::class, 'index'])->middleware('can:home')->name('home');

Route::get('/grafica', [HomeController::class, 'grafica'])->middleware('can:grafica')->name('grafica');

Route::get('/selectTopics', [HomeController::class, 'getTopics'])->middleware('can:selectTopics')->name('selectTopics');

Route::get('/selectConfigurations', [HomeController::class, 'getConfigurations'])->middleware('can:selectConfigurations')->name('selectConfigurations');

Route::get('/configurationMqtt/{topic_id}', [HomeController::class, 'getConfiguration'])->middleware('can:configurationMqtt')->name('configurationMqtt');

Route::resource('/topics', TopicController::class)->names('topics');

Route::resource('/configurations', ConfigurationController::class)->names('configurations');

Route::resource('/users', UsersController::class)->only(['index', 'edit', 'update', 'destroy'])->names('users');

Route::get('/exportdata/{topic_id}', [HomeController::class, 'exportdata'])->middleware('can:exportdata')->name('exportdata');

Route::get('/datatopic/{topic_id}', [HomeController::class, 'getDataTopic'])->middleware('can:datatopic')->name('datatopic');

Route::post('/save/{topic_id}/{configuration_id}', [HomeController::class, 'saveDB'])->middleware('can:save')->name('save');

Route::get('/topic/{topic_id}', [HomeController::class, 'topicUsers'])->middleware('can:topic')->name('topic');

Route::get('/addUsers/{topic_id}', [HomeController::class, 'addUsers'])->middleware('can:addUsers')->name('addUsers');

Route::get('/selectUsers/{topic_id}', [HomeController::class, 'selectUsers'])->middleware('can:selectUsers')->name('selectUsers');

Route::post('/saveUsers', [HomeController::class, 'saveUsers'])->middleware('can:saveUsers')->name('saveUsers');

Route::delete('/deleteUsers/{topic_id}/{user_id}', [HomeController::class, 'deleteUsers'])->middleware('can:deleteUsers')->name('deleteUsers');

Route::get('/datatopic/{topic_id}/{startDate}/{endDate}', [HomeController::class, 'getDataByDateRange'])->middleware('can:filterData')->name('filterData');

Route::get('/aboutUs', [HomeController::class, 'aboutUs'])->middleware('can:aboutUs')->name('aboutUs');
