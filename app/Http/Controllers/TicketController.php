<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Models\Ticket;
use App\Models\TicketPriority;
use App\Models\TicketTag;
use App\Models\TicketType;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'tickets' => Ticket::with(['priority', 'type'])
                ->orderBy("created_at", "desc")
                ->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Ticket/Create', [
            'users' => User::all(),
            'ticketTypes' => TicketType::all(),
            'ticketTags' => TicketTag::all(),
            'ticketPriorities' => TicketPriority::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTicketRequest $request)
    {
        $request->validated();
        Ticket::create(array_merge([
            'author_id' =>  Auth::id(),
            //  ...$request->validated()
        ], $request->safe()->all()));

        return Redirect::route('tickets.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Inertia::render('Ticket/Show', [
            'ticket' => Ticket::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        return Inertia::render('Ticket/Edit', [
            'users' => User::all(),
            'ticket' => $ticket,
            'ticketTypes' => TicketType::all(),
            'ticketTags' => TicketTag::all(),
            'ticketPriorities' => TicketPriority::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return Redirect::route('tickets.show', ['ticket' => $ticket]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return Redirect::route('tickets.index');
    }
}
