<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferenciaInternasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transferencia_internas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('cliente_id')->unsigned();
            $table->bigInteger('cuenta_origen');
            $table->bigInteger('cuenta_destino');
            $table->integer('monto');
            $table->integer('saldo');
            $table->integer('saldo_destino');
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
        Schema::dropIfExists('transferencia_internas');
    }
}
