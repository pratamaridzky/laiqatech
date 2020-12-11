<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('description', 150);
            $table->bigInteger('self_parent_id')->unsigned();
            $table->string('flag_app', 200);
            $table->enum('is_active', ['0', '1']);
            $table->timestamps();

            $table->unique(['description', 'flag_app'], 'idx_desc');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
