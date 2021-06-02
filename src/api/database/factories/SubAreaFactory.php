<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\models\master\Area;
use App\models\master\SubArea;
use Faker\Generator as Faker;

$factory->define(SubArea::class, function (Faker $faker) {
    return [
        'description' => $faker->streetSuffix.' '.$faker->state,
        'area_id' => factory(Area::class),
        'address' => $faker->address,
        'phone1' => $faker->e164PhoneNumber,
        'phone2' => $faker->e164PhoneNumber,
        'email' => $faker->unique()->safeEmail,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
    ];
});
