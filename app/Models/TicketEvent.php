<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketEvent extends Model
{
    use HasFactory;

    /**
     * Get the change user
     */
    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    /**
     * Get the ticket that owns the comment.
     */
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
