<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjEv extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proj_ev', function (Blueprint $table) {
            $table->Increments('id');
            $table->unsignedInteger('ev_id');
            $table->unsignedInteger('project_id');
            $table->foreign('ev_id')->references('id')->on('ev_item');
            $table->foreign('project_id')->references('id')->on('projectos');
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
        Schema::dropIfExists('proj_ev');
    }
}
