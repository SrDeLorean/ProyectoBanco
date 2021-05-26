<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CuentasController extends Controller
{
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
