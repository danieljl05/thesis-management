<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgEveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prog_eve', function (Blueprint $table) {
            $table->Increments('id');
            $table->unsignedInteger('prog_id');
            $table->unsignedInteger('eva_id');
            $table->foreign('prog_id')->references('id')->on('projects');
            $table->foreign('eva_id')->references('id')->on('evaluation_config');
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
        Schema::dropIfExists('prog_eve');
    }
}
