import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { UnorderedList, ListItem, Button } from '@chakra-ui/react';

export default function Dashboard(props) {
    console.log(props.tickets)
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard tickets</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Link href={route('tickets.create')}>
                            <Button colorScheme='teal' variant='solid'>
                                Nouveau ticket
                            </Button>
                        </Link>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <UnorderedList>
                                    {props.tickets.map((ticket) => (
                                    <Link key={ticket.id} href={route('tickets.show', ticket.id)}>
                                        <ListItem >{ticket.created_at.toString()} -- {ticket.title}</ListItem>
                                    </Link>
                                ))}
                            </UnorderedList>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
