<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{

    protected $attributes = [
        'active' => true,
    ];

    protected $fillable = [
        'title',
        'description',
        'type_id',
        'priority_id',
        'author_id'
    ];

    use HasFactory;

    /**
     * Get the events
     */
    public function events()
    {
        return $this->hasMany(TicketEvent::class);
    }

    /**
     * Get all of the tags for the ticket.
     */
    public function tags()
    {
        return $this->morphToMany(TicketTag::class, 'taggable');
    }

    /**
     * Get the priority of the ticket.
     */
    public function priority()
    {
        return $this->belongsTo(TicketPriority::class);
    }

    /**
     * Get the priority of the ticket.
     */
    public function type()
    {
        return $this->belongsTo(TicketType::class);
    }

    /**
     * Get the author of the ticket.
     */
    public function author()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    /**
     * Get the author of the ticket.
     */
    public function assignedUser()
    {
        return $this->belongsTo(User::class)->withDefault();
    }
}
