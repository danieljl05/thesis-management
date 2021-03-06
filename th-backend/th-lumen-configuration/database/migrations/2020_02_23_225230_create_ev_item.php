<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvItem extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ev_item', function (Blueprint $table) {
            $table->Increments('id');
            $table->unsignedInteger('evaluation_config_id');
            $table->string('name');
            $table->unsignedInteger('percentage');
            $table->foreign('evaluation_config_id')->references('id')->on('evaluation_config')->onDelete('cascade');;
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
        Schema::dropIfExists('ev_item');
    }
}
