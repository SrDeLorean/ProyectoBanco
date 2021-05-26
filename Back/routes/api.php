<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CuentasController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TransferenciasController;
use App\Http\Controllers\UsuarioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, "login"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('refresh', [AuthController::class, "refresh"]);
    Route::get('me', [AuthController::class, "me"]);



});

Route::group(['middleware' => 'auth:api'], function(){
    // Rutas CRUD de Usuario
    Route::get('usuarios', [UsuarioController::class, 'showAll']);
    Route::get('usuarios/{id}', [UsuarioController::class, 'show']);
    Route::post('usuarios', [UsuarioController::class, 'store']);
    Route::put('usuarios/{id}', [UsuarioController::class, 'update']);
    Route::delete('usuarios/{id}', [UsuarioController::class, 'delete']);

    Route::get('cuentas', [CuentasController::class, 'getCuentas']);

    // Rutas Transferencias
    Route::get('transferencias/internas', [TransferenciasController::class, 'getInt']);
    Route::post('transferencias/internas', [TransferenciasController::class, 'storeInt']);

    // Rutas CRUD de Productos

});


