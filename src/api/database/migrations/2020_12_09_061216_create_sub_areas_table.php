<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_areas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('companie_id')->unsigned();
            $table->string('description', 150);
            $table->text('address');
            $table->string('phone1', 15);
            $table->string('phone2', 15);
            $table->string('email', 100);
            $table->enum('is_active', ['0', '1']);
            $table->timestamps();

            $table->foreign('companie_id')
                ->references('id')
                ->on('companies')
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
        Schema::dropIfExists('sub_areas');
    }
}
