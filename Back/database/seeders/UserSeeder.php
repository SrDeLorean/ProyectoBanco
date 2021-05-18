<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'nombre' => 'admin',
            'email' => 'admin@gmail.com',
            'rol' => 'admin',
            'password' => bcrypt('123456'),
            'rut' => '1-9',
        ]);

        User::create([
            'nombre' => 'user',
            'email' => 'user@gmail.com',
            'rol' => 'user',
            'password' => bcrypt('123456'),
            'rut' => '24251436-k',
        ]);
    }
}
