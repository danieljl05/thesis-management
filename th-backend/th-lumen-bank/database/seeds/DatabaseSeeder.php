<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        DB::table('users')->insert([
            'name' => 'Admin',
            'role' => 1,
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$UT2JvBOse3.6uuElsmqDpOhvp8d5PkoRdmbIHDMwOJmr226GRrmKe',
        ]);

        DB::table('programs')->insert([
            ['name' => 'Ingeniería de sistemas'],
            ['name' => 'Ingeniería electrónica'],
            ['name' => 'Ingeniería industrial'],
            ['name' => 'Diseño gráfico'],
            ['name' => 'Psicología'],
            ['name' => 'Administración de empresas'],
            ['name' => 'Negocios internacionales'],
            ['name' => 'Criminalística'],
        ]);
    }
}
