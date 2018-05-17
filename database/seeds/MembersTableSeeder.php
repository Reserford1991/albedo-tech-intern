<?php

use Illuminate\Database\Seeder;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        $limit = 5;

        for ($i = 0; $i < $limit; $i++) {
            DB::table('members')->insert([
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'birthdate' => $faker->unixTime($max = 'now'),
                'report' =>  $faker->sentence($nbWords = 6, $variableNbWords = true),
                'country' => $faker->countryCode,
                'phone' => $faker->numberBetween($min = 10000000000, $max = 99999999999),
                'mail' => $faker->unique()->email,
                'company' => $faker->company,
                'position' => $faker->jobTitle,
                'about' => $faker->text,
                'photo' => "",
                'hidden' => false,
                'created_at' => $faker->unixTime($max = 'now')
            ]);
        }
    }
}
