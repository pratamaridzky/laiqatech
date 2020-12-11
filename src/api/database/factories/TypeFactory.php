<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Categorie;
use App\models\master\Type;
use Faker\Generator as Faker;

$factory->define(Type::class, function (Faker $faker) {
    return [
        'description' => $faker->colorName,
        'is_active' => '1',
        'categorie_id' => factory(Categorie::class),
    ];
});
