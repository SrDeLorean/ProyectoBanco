<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferenciaExternasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transferencia_externas', function (Blueprint $table) {
            $table->id();
            // CUENTA DE ORIGEN
            $table->integer('tipo_cuenta_origen');
            $table->bigInteger('cuenta_origen');
            // CUENTA DE DESTINO (si es mismo banco)
            $table->integer('tipo_cuenta_destino');
            $table->bigInteger('cuenta_destino');
            $table->integer('monto');
            $table->integer('saldo');
            $table->integer('saldo_destino');
            $table->bigInteger('cliente_id')->unsigned();
            $table->foreign('cliente_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transferencia_externas');
    }
}
