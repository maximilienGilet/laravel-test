<?php

namespace Database\Seeders;

use App\Models\TicketType;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TicketType::create([
            'name' => 'improvement_idea'
        ]);

        TicketType::create([
            'name' => 'feature_request'
        ]);

        TicketType::create([
            'name' => 'bug'
        ]);
    }
}
