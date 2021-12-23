import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import {
    UnorderedList,
    ListItem,
    Button,
    Flex,
    Spacer,
    Center,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import LastSeen from "@/Components/LastSeen";

export default function Dashboard(props) {
    console.log(props.tickets);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <Flex>
                        <Center>Dashboard tickets</Center>
                        <Spacer />
                        <Link href={route("tickets.create")}>
                            <Button leftIcon={<Plus />} colorScheme="teal" variant="solid">
                                Nouveau ticket
                            </Button>
                        </Link>
                    </Flex>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <UnorderedList>
                                {props.tickets.map((ticket) => (
                                    <Link
                                        key={ticket.id}
                                        href={route("tickets.show", ticket.id)}
                                    >
                                        <ListItem>
                                            <LastSeen title={ticket.created_at.toString()} date={ticket.created_at.toString()} />
                                            {ticket.title}
                                        </ListItem>
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
