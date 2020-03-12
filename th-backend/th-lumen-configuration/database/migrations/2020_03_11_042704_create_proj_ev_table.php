<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjEvTable extends Migration
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
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('eva_item_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('eva_item_id')->references('id')->on('ev_item');
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
