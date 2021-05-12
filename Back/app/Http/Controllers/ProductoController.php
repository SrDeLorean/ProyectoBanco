<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Models\Producto;
use App\Models\ProductoBrindi;
use App\Models\ProductoCategoria;
use App\Models\ProductoPasatiempo;
use App\Models\ProductoPreferencia;
use App\Models\ProductoMascota;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $productos =  Producto::all();
            return response()->json([
                'success' => true,
                'message' => "done",
                'data' => ['productos'=>$productos]
            ], 200);
        //----- Mecanismos anticaidas y reporte de errores -----
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => 'Error al solicitar peticion a la base de datos',
                'data' => ['error'=>$ex]
            ], 409);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $entradas = $request->only('nombre', 'cantidad', 'precioCompra', 'precioVenta', 'foto');
        $validator = Validator::make($entradas, [
            'nombre' => ['required', 'string'],
            'cantidad' => [' required', 'numeric'],
            'precioCompra' => ['required', 'numeric'],
            'precioVenta' => [' required', 'numeric'],
            'foto' => ['nullable', 'string'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error en datos ingresados',
                'data' => ['error'=>$validator->errors()]
            ], 422);
        }
        try{
            $producto = new Producto();
            $producto->nombre=$entradas['nombre'];
            $producto->cantidad=$entradas['cantidad'];
            $producto->precioCompra=$entradas['precioCompra'];
            $producto->precioVenta=$entradas['precioVenta'];
            $producto->foto=$entradas['foto'];
            $producto->save();
            return response()->json([
                'success' => true,
                'message' => "done",
                'data' => ['producto'=>$producto]
            ], 200);
        //----- Mecanismos anticaidas y reporte de errores -----
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => "Error en la base de datos",
                'data' => ['data'=>$ex]
            ], 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $entradas = $request->only('nombre', 'cantidad', 'precioCompra', 'precioVenta', 'foto');
        $validator = Validator::make($entradas, [
            'nombre' => ['nullable', 'string'],
            'cantidad' => [' nullable', 'numeric'],
            'precioCompra' => ['nullable', 'numeric'],
            'precioVenta' => [' nullable', 'numeric'],
            'foto' => ['nullable', 'string']
        ]);
        //respuesta cuando falla
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error en datos ingresados',
                'data' => ['error'=>$validator->errors()]
            ], 422);
        }
        try{
            $producto = Producto::find($id);
            if($producto==null){
                return response()->json([
                    'success' => false,
                    'message' => 'El producto con el id '.$id.' no existe',
                    'data' => null
                ], 409);
            }
            $producto->nombre=$entradas['nombre'];
            $producto->cantidad=$entradas['cantidad'];
            $producto->precioCompra=$entradas['precioCompra'];
            $producto->precioVenta=$entradas['precioVenta'];
            $producto->foto=$entradas['foto'];
            $producto->save();
            return response()->json([
                'success' => true,
                'message' => "done",
                'data' => ['producto'=>$producto]
            ], 200);
        //----- Mecanismos anticaidas y reporte de errores -----
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => "Error en la base de datos",
                'data' => ['error'=>$ex]
            ], 409 );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $producto = Producto::find($id);
            if($producto==null){
                return response()->json([
                    'success' => false,
                    'message' => 'El producto con el id '.$id.' no existe',
                    'data' => null
                ], 409 );
            }
            $producto->delete();
            return response()->json([
                'success' => true,
                'message' => "done",
                'data' => ['producto'=>$producto]
            ], 200);
        //----- Mecanismos anticaidas y reporte de errores -----
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => "Error en la base de datos",
                'data' => ['error'=>$ex]
            ], 409 );
        }
    }
}
