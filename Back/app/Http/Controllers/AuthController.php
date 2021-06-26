<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login2']]);
    }

    /**
     * Metodo para loguearse con las credenciales de email y password
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error en las credenciales',
                'data' => ['error'=>$validator->errors()]
            ], 422);
        }
        try{
            $token = JWTAuth::attempt($credentials);
            if ($token) {
                return response()->json([
                    'success' => true,
                    'message' => 'Operacion realizada con exito',
                    'data' => ['token'=>$token,
                            'user' =>User::where('email', $credentials['email'])->get()->first()],
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'code' => 3,
                    'message' => 'Error en las credenciales',
                    'data' => ['error'=>$validator->errors()]
                ], 401);
            }
        //este catch permite responder directamente que problemas en la peticion SQL
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al solicitar peticiones a la base de datos',
                'data' => ['error'=>$ex]
            ], 409);
        }
    }
    /**
     * Metodo para loguearse con rut y password
     */
    public function login2(Request $request)
    {
        $validator = Validator::make($request->only(['rut', 'password']), [
            'rut' => 'required|exists:users,rut',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error en las credenciales',
                'data' => ['error'=>$validator->errors()]
            ], 422);
        }
        try{
            $user = User::where('rut', $request->rut)->first();
            $credentials = [
                'email' => $user->email,
                'password' => $request->password
            ];
            $token = JWTAuth::attempt($credentials);
            if ($token) {
                return response()->json([
                    'success' => true,
                    'message' => 'Operacion realizada con exito',
                    'data' => ['token'=>$token,
                            'user' =>User::where('email', $user->email)->get()->first()],
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'code' => 3,
                    'message' => 'Error en las credenciales',
                    'data' => ['error'=>$validator->errors()]
                ], 401);
            }
        //este catch permite responder directamente que problemas en la peticion SQL
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al solicitar peticiones a la base de datos',
                'data' => ['error'=>$ex]
            ], 409);
        }
    }

    /**
     * Metodo para obtener el usuario actual autenticado
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $credencials = JWTAuth::parseToken()->authenticate();
        return response()->json([
            'success' => true,
            'message' => 'Correct login',
            'data' =>['user' => $credencials]
        ], 200);
    }

    /**
     * Metodo para desconectarse e invalidar el token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        //  $this->validate($request, ['token' => 'required']);
        $token = JWTAuth::getToken();
        try {
            $token = JWTAuth::invalidate($token);
            return response()->json([
                'success' => true,
                'code' => 1,
                'message' => "Has cerrado la sesión con exito",
                'data' => null
            ], 200);
        //este catch permite responder directamente que problemas en la peticion de Token
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => "No se a podido cerrar la sesión, por favor volver a intentar",
                'data' => null
            ], 422);
        //este catch permite responder directamente que problemas en la peticion SQL
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'success' => false,
                'message' => 'Error al solicitar peticiones a la base de datos',
                'data' => ['error'=>$ex]
            ], 409);
        }
    }

    /**
     * Metodo para refrescar un token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $token = JWTAuth::getToken();
        try {
            $token = JWTAuth::refresh($token);
            return response()->json(['success' => true, 'token' => $token], 200);
        } catch (TokenExpiredException $ex) {
            // We were unable to refresh the token, our user needs to login again
            return response()->json([
                'success' => false,
                'message' => 'Need to login again, please (expired)!',
                'data' => []
            ], 422);
        } catch (TokenBlacklistedException $ex) {
            // Blacklisted token
            return response()->json([
                'success' => false,
                'message' => 'Need to login again, please (blacklisted)!',
                'data' => []
            ], 422);
        }
    }

    /**
     * Metodo para obtener el token y su información
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
