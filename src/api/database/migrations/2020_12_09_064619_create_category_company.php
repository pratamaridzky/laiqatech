<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryCompany extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('category_company', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedInteger('categorie_id')->foreign('categorie_id')->references('id')->on('categories');
            $table->unsignedInteger('companie_id')->foreign('companie_id')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('category_company');
    }
}
