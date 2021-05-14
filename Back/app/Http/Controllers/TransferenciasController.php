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
                'tipo_cuenta_origen' => 'required',
                'cuenta_origen' => 'required',
                'tipo_cuenta_destino' => 'required',
                'cuenta_destino' => 'required',
                'monto' => 'required'
            ]);

            if($validador->fails()){
                return response()->json([
                    'status' => 500,
                    'msg' => 'Hubo un problema al validar los datos.'
                ]);
            }
            $cuentaOrig = null;
            $cuentaDest = null;
            switch($request->tipo_cuenta_origen){
                case 0: // Cuenta corriente
                    $cuentaOrig = CuentaCorriente::findOrFail($request->cuenta_origen);
                    break;
                case 1: // Cuenta ahorros
                    $cuentaOrig = CuentaAhorro::findOrFail($request->cuenta_origen);
                    break;
                case 2: // Cuenta credito
                    $cuentaOrig = CuentaCredito::findOrFail($request->cuenta_origen);
                    break;
                default: // Otra cuenta
                    return response()->json([
                        'status' => 500,
                        'msg' => 'El tipo de cuenta no existe.'
                    ]);
                    break;
            }
            switch($request->tipo_cuenta_destino){
                case 0: // Cuenta corriente
                    $cuentaDest = CuentaCorriente::findOrFail($request->cuenta_origen);
                    break;
                case 1: // Cuenta ahorros
                    $cuentaDest = CuentaAhorro::findOrFail($request->cuenta_origen);
                    break;
                case 2: // Cuenta credito
                    $cuentaDest = CuentaCredito::findOrFail($request->cuenta_origen);
                    break;
                default: // Otra cuenta
                    return response()->json([
                        'status' => 500,
                        'msg' => 'El tipo de cuenta no existe.'
                    ]);
                    break;
            }

            $trans = new TransferenciaInterna();
            $trans->tipo_cuenta_origen = $request->tipo_cuenta_origen;
            $trans->cuenta_origen = $request->cuenta_origen;
            $trans->tipo_cuenta_destino = $request->tipo_cuenta_destino;
            $trans->cuenta_destino = $request->cuenta_destino;
            $trans->monto = $request->monto;
            $trans->cliente_id = Auth::id();
            $trans->save();

            $cuentaOrig->saldo = $cuentaOrig->saldo - $request->monto;
            $cuentaOrig->save();

            $cuentaDest->saldo = $cuentaDest->saldo + $request->monto;
            $cuentaDest->save();

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
