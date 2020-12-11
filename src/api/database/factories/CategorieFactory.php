<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Categorie;
use Faker\Generator as Faker;

$factory->define(Categorie::class, function (Faker $faker) {
    $array = array ('makan berat','makanan ringan','minuman', 'toping makanan', 'toping minuman');
    return [
        // 'description' => $faker->unique()->randomElement($array),
        'description' => $faker->unique()->safeColorName,
        'is_active' => '1',
        'flag_app'=>'resto',
        // 'self_parent_id' => factory(Categorie::class)
        'self_parent_id' => 2
    ];
});
