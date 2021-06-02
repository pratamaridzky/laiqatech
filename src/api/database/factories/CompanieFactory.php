<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Companie;
use Faker\Generator as Faker;

$factory->define(Companie::class, function (Faker $faker) {
    return [
        'description' => $faker->company,
        'code' => $faker->unique()->numberBetween($min = 100, $max = 999),
    ];
});
