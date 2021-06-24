<?php

namespace App\Http\Controllers;

use App\Models\TransferenciaExterna;
use App\Models\TransferenciaInterna;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class CuentasController extends Controller
{
    /**
     * Metodo para obtener los balances de una cuenta
     */
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
    /**
     * Metodo para obtener un excel con el balance de una cuenta
     */
    public function exportarBalance(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $trans1 = [];
        $trans2 = [];
        $transI = [];
        $strCuenta = '';
        switch($request->tipocuenta){
            case 0:
                $strCuenta = 'Corriente';
                $cuenta = $user->cuentaCorriente;
                if($cuenta==null)
                    return response()->json(['status' => 500, 'msg' => 'El usuario no posee este tipo de cuenta.']);
                $trans1 = TransferenciaExterna::where('tipo_cuenta_origen', 0)->where('cuenta_origen', $cuenta->id)->get();
                $trans2 = TransferenciaExterna::where('tipo_cuenta_destino', 0)->where('cuenta_destino', $cuenta->id)->get();
                $transI = TransferenciaInterna::where('cliente_id', $user->id)->get();;
                break;
            case 1:
                $strCuenta = 'Ahorro';
                $cuenta = $user->cuentaAhorro;
                if($cuenta==null)
                    return response()->json(['status' => 500, 'msg' => 'El usuario no posee este tipo de cuenta.']);
                $trans1 = TransferenciaExterna::where('tipo_cuenta_origen', 1)->where('cuenta_origen', $cuenta->id)->get();
                $trans2 = TransferenciaExterna::where('tipo_cuenta_destino', 1)->where('cuenta_destino', $cuenta->id)->get();
                $transI = TransferenciaInterna::where('cliente_id', $user->id)->get();;
                break;
            case 2:
                $strCuenta = 'Credito';
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

        $balance = array_merge($trans1->toArray(), $trans2->toArray(), $transI->toArray());
        usort($balance, 'App\Http\Controllers\CuentasController::date_compare');

        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(storage_path('ExcelTemplates/Balance.xlsx'));
        $worksheet = $spreadsheet->getActiveSheet();
        $worksheet->getCell('C2')->setValue($user->nombre);
        $worksheet->getCell('C3')->setValue($strCuenta);
        $worksheet->getCell('C4')->setValue($cuenta->id);
        $worksheet->getCell('C5')->setValue(date('d-m-Y'));

        $fila = 8;
        foreach($balance as $trans){
            $worksheet->getCell('B'.$fila)->setValue(date('d-m-Y', strtotime($trans['created_at'])));
            if(intval($trans['cuenta_origen']) == intval($cuenta->id)){
                $worksheet->getCell('C'.$fila)->setValue($trans['monto']);
                $worksheet->getCell('D'.$fila)->setValue(0);
            }else{
                $worksheet->getCell('C'.$fila)->setValue(0);
                $worksheet->getCell('D'.$fila)->setValue($trans['monto']);
            }
            $worksheet->getCell('E'.$fila)->setValue('-');
            $worksheet->getCell('F'.$fila)->setValue($trans['saldo']);
            $fila++;
        }


        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="BALANCE_CUENTA.xlsx"'); /*-- $filename is  xsl filename ---*/
        header('Cache-Control: max-age=0');

        $writer->save('php://output');
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
