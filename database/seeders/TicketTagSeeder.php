<?php

namespace Database\Seeders;

use App\Models\TicketTag;
use Illuminate\Database\Seeder;

class TicketTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TicketTag::create([
            'name' => 'feature_request'
        ]);

        TicketTag::create([
            'name' => 'bug'
        ]);

        TicketTag::create([
            'name' => 'improvement_idea'
        ]);

        TicketTag::create([
            'name' => 'todo'
        ]);

        TicketTag::create([
            'name' => 'need_help'
        ]);
    }
}
