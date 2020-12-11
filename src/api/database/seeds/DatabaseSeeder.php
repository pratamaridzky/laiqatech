<?php

use App\http\models\master\Categorie;
use App\http\models\master\Companie;
use App\http\models\master\SubArea;
use App\http\models\master\Type;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
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
        DB::table('sub_areas')->delete();

        $company = factory(Companie::class,30)
            ->create()
            ->each(function($company){
                $company->subAreas()->save(factory(SubArea::class)->make());
            });

    }
}

class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->delete();
        // DB::table('types')->delete();

        // $categori = factory(Categorie::class,5)
        //     ->create()
        //     ->each(function($categori){
        //         $categori->types()->save(factory(Type::class)->make());
        //     })
        //     ;

        $array = array ('makan berat','makanan ringan','minuman', 'toping makanan', 'toping minuman');
        foreach($array as $row){
            DB::table('categories')->insert([
                'description' => $row,
                'is_active' => '1',
                'flag_app'=>'resto',
                'self_parent_id' => 2
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
            'group' => '1'
        ]);
    }
}
