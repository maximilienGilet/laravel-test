<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Ticket extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->mediumText('description');
            $table->boolean('active');
            $table->timestamps();

            $table->foreignId('type_id')->constrained('ticket_types');

            $table->foreignId('priority_id')->constrained('ticket_priorities');
            $table->foreignId('author_id')->constrained('users');
            $table->foreignId('assigned_user_id')->nullable()->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tickets');
    }
}
