<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Area;
use App\models\master\Companie;
use Faker\Generator as Faker;

$factory->define(Area::class, function (Faker $faker) {
    return [
        'companie_id' => factory(Companie::class),
        'name' => $faker->country,
        'description' => $faker->company.' - '.$faker->country,
    ];
});
