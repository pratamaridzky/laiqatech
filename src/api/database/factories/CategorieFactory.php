<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Categorie;
use Faker\Generator as Faker;

$factory->define(Categorie::class, function (Faker $faker) {
    $array = array ('makan berat','makanan ringan','minuman', 'toping makanan', 'toping minuman');
    return [
        'name' => $faker->unique()->safeColorName,
        'description' => 'description bla bla bla bla bla',
        'flag_app'=>'resto',
        'self_parent_id' => 2
    ];
});
