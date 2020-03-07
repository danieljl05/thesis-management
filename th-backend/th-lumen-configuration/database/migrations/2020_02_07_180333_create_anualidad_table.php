<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnualidadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anualidad', function (Blueprint $table) {
            $table->Increments('id');
             $table->string('codigo');
              $table->unsignedInteger('rubrica_id');
             $table->foreign('rubrica_id')->references('id')->on('rubrica');
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
        Schema::dropIfExists('anualidad');
    }
}
