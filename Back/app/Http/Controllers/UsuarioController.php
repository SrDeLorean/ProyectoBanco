<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
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

    public function showAll(){
        return User::all();
    }

    public function store(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'email' => 'required',
                'rol' => 'required',
                'password' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.'
                ]);
            }

            $user = new User();
            $user->nombre = $request->nombre;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->rol = $request->rol;
            $user->save();

            return response()->json([
                'status' => 200,
                'msg' => 'Usuario creado correctamente.'
            ]);

        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al crear el usuario.'
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validador = Validator::make($request->all(), [
                'nombre' => 'required',
                'email' => 'required',
                'rol' => 'required',
                'password' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.'
                ]);
            }

            $user = User::findOrFail($id);
            $user->nombre = $request->nombre;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->rol = $request->rol;
            $user->save();

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

    public function delete(Request $request, $id){
        try{
            $user = User::findOrFail($id);
            $user->delete();
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al eliminar el usuario.'
            ]);
        }
    }
}
