<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projectos', function (Blueprint $table) {
            $table->Increments('id');
            $table->string('descripcion');
            $table->string('abstract');
            $table->unsignedInteger('semestre_id');
            $table->unsignedInteger('anualidad_id');
             $table->foreign('anualidad_id')->references('id')->on('anualidad');
            $table->foreign('semestre_id')->references('id')->on('semestre');
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
        Schema::dropIfExists('projectos');
    }
}
