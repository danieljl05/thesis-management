<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgUsuaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prog_usua', function (Blueprint $table) {
            $table->Increments('id');
            $table->unsignedInteger('programa_id');
            $table->unsignedInteger('usuario_id');
             $table->foreign('programa_id')->references('id')->on('programas');
            $table->foreign('usuario_id')->references('id')->on('users');
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
        Schema::dropIfExists('prog_usua');
    }
}
