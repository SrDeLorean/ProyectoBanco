<?php

namespace App\Http\Controllers;

use App\Models\CuentaAhorro;
use App\Models\CuentaCorriente;
use App\Models\CuentaCredito;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    /**
     * Metodo para mostrar un cliente en especifico
     */
    public function show($id){
        try{
            $user = User::findOrFail($id);
            return $user;
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al mostrar los usuarios.'
            ]);
        }
        return User::findOrFail($id);
    }
    /**
     * Metodo para mostrar todos los clientes
     */
    public function showAll(){
        return User::all();
    }
    /**
     * Metodo para guardar un nuevo cliente y sus respectivas cuentas
     */
    public function store(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'rut' => 'required',
                'nombre' => 'required',
                'email' => 'required',
                'rol' => 'required',
                'password' => 'required',
                'cuenta_corriente' => 'required|integer',
                'cuenta_ahorro' => 'required|integer',
                'cuenta_credito' => 'required|integer'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.'
                ]);
            }

            $user = new User();
            $user->rut = $request->rut;
            $user->nombre = $request->nombre;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->rol = $request->rol;
            $user->save();
            if($request->cuenta_corriente > 0){
                $cuenta = new CuentaCorriente();
                $cuenta->saldo = $request->cuenta_corriente;
                $cuenta->cliente_id = $user->id;
                $cuenta->save();
            }
            if($request->cuenta_ahorro > 0){
                $cuenta = new CuentaAhorro();
                $cuenta->saldo = $request->cuenta_ahorro;
                $cuenta->cliente_id = $user->id;
                $cuenta->save();
            }
            if($request->cuenta_credito > 0){
                $cuenta = new CuentaCredito();
                $cuenta->saldo = $request->cuenta_credito;
                $cuenta->cliente_id = $user->id;
                $cuenta->save();
            }

            return response()->json([
                'status' => 200,
                'msg' => 'Usuario creado correctamente.'
            ]);

        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al crear el usuario.',
                'error' => $ex
            ]);
        }
    }
    /**
     * Metodo para actualizar la información de un cliente en especifico
     */
    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'rut' => 'required',
                'nombre' => 'required',
                'email' => 'required',
                'rol' => 'required',
                'password' => 'required',
                'cuenta_corriente' => 'required|integer',
                'cuenta_ahorro' => 'required|integer',
                'cuenta_credito' => 'required|integer'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.'
                ]);
            }

            $user = User::findOrFail($id);
            $user->nombre = $request->nombre;
            $user->rut = $request->rut;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->rol = $request->rol;
            $user->save();

            if($request->cuenta_corriente > 0){
                $cuenta = $user->cuentaCorriente()->first();
                $cuenta->saldo = $request->cuenta_corriente;
                $cuenta->save();
            }
            if($request->cuenta_ahorro > 0){
                $cuenta = $user->cuentaAhorro()->first();
                $cuenta->saldo = $request->cuenta_ahorro;
                $cuenta->save();
            }
            if($request->cuenta_credito > 0){
                $cuenta = $user->cuentaCredito()->first();
                $cuenta->saldo = $request->cuenta_credito;
                $cuenta->save();
            }

            return response()->json([
                'status' => 200,
                'msg' => 'Usuario modificado correctamente.'
            ]);

        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al modificar el usuario.'
            ]);
        }
    }
    /**
     * Metodo para dar de baja un usuario
     */
    public function delete(Request $request, $id){
        try{
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'status' => 200,
                'msg' => 'Usuario eliminado correctamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al eliminar el usuario.'
            ]);
        }
    }
}
