<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('categories_id')->unsigned();
            $table->integer('brands_id')->unsigned();
            $table->integer('types_id')->unsigned();
            $table->integer('prices_id')->unsigned();
            $table->integer('sub_areas_id')->unsigned();
            $table->integer('colors_id')->unsigned();
            $table->string('name', 100);
            $table->string('code', 100);
            $table->text('description');
            $table->softDeletes();

            $table->timestamps();

            $table->foreign('categories_id')
            ->references('id')
            ->on('categories')
            ->onDelete('cascade');

            $table->foreign('brands_id')
            ->references('id')
            ->on('brands')
            ->onDelete('cascade');
            
            $table->foreign('types_id')
            ->references('id')
            ->on('types')
            ->onDelete('cascade');
            
            $table->foreign('prices_id')
            ->references('id')
            ->on('prices')
            ->onDelete('cascade');
            
            $table->foreign('sub_areas_id')
            ->references('id')
            ->on('sub_areas')
            ->onDelete('cascade');
           
            $table->foreign('colors_id')
            ->references('id')
            ->on('colors')
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
        Schema::dropIfExists('items');
    }
}
