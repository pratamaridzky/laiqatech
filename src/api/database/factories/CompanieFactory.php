<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Companie;
use App\Model;
use Faker\Generator as Faker;

$factory->define(Companie::class, function (Faker $faker) {
    return [
        'description' => $faker->company,
        'is_active' => '1'
    ];
});
