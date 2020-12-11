<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesHasCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies_has_categories', function (Blueprint $table) {
            $table->id();
                        
            $table->bigInteger('companie_id')
                ->unsigned();

            $table->bigInteger('categorie_id')
                ->unsigned();
                
            $table->timestamps();

            $table->foreign('companie_id')
                ->references('id')
                ->on('companies')
                ->onDelete('cascade');

            $table->foreign('categorie_id')
                ->references('id')
                ->on('categories')
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
        Schema::dropIfExists('companies_has_categories');
    }
}
