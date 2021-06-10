<?php

namespace App\Http\Controllers;

use App\Models\TransferenciaExterna;
use App\Models\TransferenciaInterna;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CuentasController extends Controller
{

    public function getBalance(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $trans1 = [];
        $trans2 = [];
        $transI = [];
        switch($request->tipocuenta){
            case 0:
                $cuenta = $user->cuentaCorriente;
                if($cuenta==null)
                    return response()->json(['status' => 500, 'msg' => 'El usuario no posee este tipo de cuenta.']);
                $trans1 = TransferenciaExterna::where('tipo_cuenta_origen', 0)->where('cuenta_origen', $cuenta->id)->get();
                $trans2 = TransferenciaExterna::where('tipo_cuenta_destino', 0)->where('cuenta_destino', $cuenta->id)->get();
                $transI = TransferenciaInterna::where('cliente_id', $user->id)->get();;
                break;
            case 1:
                $cuenta = $user->cuentaAhorro;
                if($cuenta==null)
                    return response()->json(['status' => 500, 'msg' => 'El usuario no posee este tipo de cuenta.']);
                $trans1 = TransferenciaExterna::where('tipo_cuenta_origen', 1)->where('cuenta_origen', $cuenta->id)->get();
                $trans2 = TransferenciaExterna::where('tipo_cuenta_destino', 1)->where('cuenta_destino', $cuenta->id)->get();
                $transI = TransferenciaInterna::where('cliente_id', $user->id)->get();;
                break;
            case 2:
                $cuenta = $user->cuentaCredito;
                if($cuenta==null)
                    return response()->json(['status' => 500, 'msg' => 'El usuario no posee este tipo de cuenta.']);
                $trans1 = TransferenciaExterna::where('tipo_cuenta_origen', 2)->where('cuenta_origen', $cuenta->id)->get();
                $trans2 = TransferenciaExterna::where('tipo_cuenta_destino', 2)->where('cuenta_destino', $cuenta->id)->get();
                $transI = TransferenciaInterna::where('cliente_id', $user->id)->get();;
                break;
            default:
                return response()->json(['status' => 500, 'msg' => 'El usuario no posee este tipo de cuenta.']);
                break;
        }
        // Origen cuenta cliente (restan)
        // Destino cuenta cliente (suman)

        $balance = array_merge($trans1->toArray(), $trans2->toArray(), $transI->toArray());
        usort($balance, 'App\Http\Controllers\CuentasController::date_compare');
        return response()->json($balance);
    }

    private static function date_compare($a, $b){
        $t1 = strtotime($a['created_at']);
        $t2 = strtotime($b['created_at']);
        return $t1 - $t2;
    }


    public function getCuentas(Request $request){
        $user = JWTAuth::parseToken()->authenticate();

        $data = [
            'cuentas' => [
                'cuenta_corriente' => $user->cuentaCorriente,
                'cuenta_ahorro' => $user->cuentaAhorro,
                'cuenta_credito' => $user->cuentaCredito
            ]
        ];

        return $data;
    }
}
