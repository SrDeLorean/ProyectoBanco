<?php

namespace App\Http\Controllers;

use App\Models\CuentaAhorro;
use App\Models\CuentaCorriente;
use App\Models\CuentaCredito;
use App\Models\TransferenciaExterna;
use App\Models\TransferenciaInterna;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class TransferenciasController extends Controller
{
    /**
     *   Metodo para obtener todas las transferencias internas de un cliente
     */
    public function getInt(){
        $cliente = Auth::id();
        $movimientos = TransferenciaInterna::where('cliente_id', $cliente)->get();
        return $movimientos;
    }
    /**
     * Metodo para obtener todas las transferencias externas de un cliente
     */
    public function getExt(){
        $cliente = Auth::id();
        $movimientos = TransferenciaExterna::where('cliente_id', $cliente)->get();
        return $movimientos;
    }
    /**
     * Metodo para generar una transferencia interna entre cuentas
     */
    public function storeInt(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'cuenta_origen' => 'required',
                'cuenta_destino' => 'required',
                'monto' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.'
                ]);
            }
            $user = JWTAuth::parseToken()->authenticate();
            $origen = null;
            $destino = null;
            switch($request->cuenta_origen){
                case 0: // Cuenta corriente
                    $origen = $user->cuentaCorriente;
                    break;
                case 1: // Cuenta ahorro
                    $origen = $user->cuentaAhorro;
                    break;
                case 2: // Cuenta credito
                    $origen = $user->cuentaCredito;
                    break;
            }
            switch($request->cuenta_destino){
                case 0: // Cuenta corriente
                    $destino = $user->cuentaCorriente;
                    break;
                case 1: // Cuenta ahorro
                    $destino = $user->cuentaAhorro;
                    break;
                case 2: // Cuenta credito
                    $destino = $user->cuentaCredito;
                    break;
            }
            if($origen == null){
                return response()->json([
                    'status' => 500,
                    'msg' => 'La cuenta de origen no existe.'
                ]);
            }
            if($destino == null){
                return response()->json([
                    'status' => 500,
                    'msg' => 'La cuenta de destino no existe.'
                ]);
            }

            $trans = new TransferenciaInterna();
            $trans->cuenta_origen = $request->cuenta_origen;
            $trans->cuenta_destino = $request->cuenta_destino;
            $trans->monto = $request->monto;
            $trans->saldo = intval($origen->saldo) - intval($request->monto);
            $trans->saldo_destino = ($destino==null)?0:(intval($destino->saldo) + intval($request->monto));
            $trans->cliente_id = $user->id;
            $trans->save();

            $origen->saldo = intval($origen->saldo) - intval($request->monto);
            $origen->save();

            $destino->saldo = intval($destino->saldo) + intval($request->monto);
            $destino->save();

            return response()->json([
                'status' => 200,
                'msg' => 'Transferencia interna realizada exitosamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al generar la transferencia interna.',
                'error' => $ex
            ]);
        }
    }
    /**
     * Metodo para generar una transferencia externa entre cuentas del mismo o distinto banco
     */
    public function storeExt(Request $request){
        try{
            $validador = Validator::make($request->all(), [
                'banco' => 'boolean',
                'tipo_origen' => 'required',
                'cuenta_origen' => 'required',
                'tipo_destino' => 'nullable',
                'cuenta_destino' => 'nullable',
                'monto' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.',
                    'errors' => $validador->errors()
                ]);
            }
            $user = JWTAuth::parseToken()->authenticate();
            $origen = null;
            $destino = null;
            switch($request->tipo_origen){
                case 0: // Cuenta corriente
                    $origen = CuentaCorriente::find($request->cuenta_origen);
                    break;
                case 1: // Cuenta ahorro
                    $origen = CuentaAhorro::find($request->cuenta_origen);
                    break;
                case 2: // Cuenta credito
                    $origen = CuentaCredito::find($request->cuenta_origen);
                    break;
            }
            if($request->banco){
                switch($request->tipo_destino){
                    case 0: // Cuenta corriente
                        $destino = CuentaCorriente::find($request->cuenta_destino);
                        break;
                    case 1: // Cuenta ahorro
                        $destino = CuentaAhorro::find($request->cuenta_destino);
                        break;
                    case 2: // Cuenta credito
                        $destino = CuentaCredito::find($request->cuenta_destino);
                        break;
                }
            }
            if($origen == null){
                return response()->json([
                    'status' => 500,
                    'msg' => 'La cuenta de origen no existe.'
                ]);
            }
            if($destino == null&&$request->banco){
                return response()->json([
                    'status' => 500,
                    'msg' => 'La cuenta de destino no existe.'
                ]);
            }

            $trans = new TransferenciaExterna();
            $trans->tipo_cuenta_origen = $request->tipo_origen;
            $trans->cuenta_origen = $request->cuenta_origen;
            $trans->tipo_cuenta_destino = $request->tipo_destino;
            $trans->cuenta_destino = $request->cuenta_destino;
            $trans->monto = $request->monto;
            $trans->saldo = intval($origen->saldo) - intval($request->monto);
            $trans->saldo_destino = ($destino==null)?0:(intval($destino->saldo) + intval($request->monto));
            $trans->cliente_id = $user->id;
            $trans->save();

            $origen->saldo = intval($origen->saldo) - intval($request->monto);
            $origen->save();
            if($destino != null){
                $destino->saldo = intval($destino->saldo) + intval($request->monto);
                $destino->save();
            }

            return response()->json([
                'status' => 200,
                'msg' => 'Transferencia externa realizada exitosamente.'
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status' => 500,
                'msg' => 'Hubo un error al generar la transferencia externa.',
                'error' => $ex
            ]);
        }
    }
}
