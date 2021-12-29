import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import TicketForm from '@/Components/forms/ticket';

export default function Edit(props) {


    console.log(props);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier un ticket</h2>}
        >
            <Head title="Modifier un ticket" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <TicketForm
                                ticket={props.ticket ?? {}}
                                submitRoute={route('tickets.update', props.ticket.id)}
                                submitMethod='patch'
                                ticketTypes={props.ticketTypes}
                                ticketPriorities={props.ticketPriorities}
                                saveText='Modifier le ticket'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
