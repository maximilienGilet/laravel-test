<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketTag extends Model
{
    use HasFactory;

    /**
     * Get all of the tickets that are assigned this tag.
     */
    public function tickets()
    {
        return $this->morphedByMany(Ticket::class, 'taggable');
    }
}
