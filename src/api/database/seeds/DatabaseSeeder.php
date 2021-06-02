<?php

use App\models\master\Area;
use App\models\master\Companie;
use App\models\master\SubArea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call('UserTableSeeder');
        $this->command->info('User table seeded!');
        $this->call('CompaniesTableSeeder');
        $this->command->info('Company & sub area table seeded!');
        $this->call('CategoryTableSeeder');
        $this->command->info('category & type table seeded!');
    }
}

class CompaniesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('companies')->delete();
        DB::table('areas')->delete();
        DB::table('sub_areas')->delete();

        factory(Companie::class, 3)
            ->create()
            ->each(function ($company) {
                $company->areas()->createMany(factory(Area::class, 5)->make()->toArray())
                    ->each(function ($area) {
                    $area->subAreas()->createMany(factory(SubArea::class, 8)->make()->toArray());
                })
                ;
            })
        ;
    }
}

class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->delete();

        $array = ['makan berat', 'makanan ringan', 'minuman', 'toping makanan', 'toping minuman'];
        foreach ($array as $row) {
            DB::table('categories')->insert([
                'name' => $row,
                'description' => 'description from '.$row,
                'flag_app' => 'resto',
            ]);
        }
    }
}

class UserTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->delete();
        DB::table('users')->insert([
            'name' => 'Ridzky Pratama',
            'username' => 'pratama',
            'password' => Hash::make('123456'),
            'group' => '1',
        ]);
    }
}
