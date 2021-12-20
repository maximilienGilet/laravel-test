<?php

namespace Database\Seeders;

use App\Models\TicketPriority;
use Illuminate\Database\Seeder;

class TicketPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TicketPriority::create([
            'name' => 'priority_normal',
            'value' => 10
        ]);

        TicketPriority::create([
            'name' => 'priority_low',
            'value' => 1
        ]);

        TicketPriority::create([
            'name' => 'priority_high',
            'value' => 20
        ]);
    }
}
