<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('currency_id')->unsigned();
            $table->integer('sub_area_id')->unsigned();
            $table->decimal('nominal', 12);
            $table->date('effective_date');
            $table->timestamps();

            $table->foreign('currency_id')
                ->references('id')
                ->on('currency')
                ->onDelete('cascade');
            
            $table->foreign('sub_area_id')
                ->references('id')
                ->on('sub_areas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prices');
    }
}
