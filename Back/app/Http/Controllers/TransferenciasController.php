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
    public function getInt(){
        $cliente = Auth::id();
        $movimientos = TransferenciaInterna::where('cliente_id', $cliente)->get();
        return $movimientos;
    }

    public function getExt(){
        $cliente = Auth::id();
        $movimientos = TransferenciaExterna::where('cliente_id', $cliente)->get();
        return $movimientos;
    }

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
            $trans->cliente_id = Auth::id();
            $trans->save();

            $origen->saldo = $origen->saldo - $request->monto;
            $origen->save();

            $destino->saldo = $destino->saldo + $request->monto;
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

}
