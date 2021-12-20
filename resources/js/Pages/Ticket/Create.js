import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Divider, Input, Select, Flex, Spacer, Textarea, Button} from '@chakra-ui/react';

export default function TicketForm(props) {

    console.log(props);

    const { data, setData, errors, post } = useForm({
        type: null,
        priority: null,
        title: "",
        description: "",
      })
    
      const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(key, value);
      }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("tickets.store"));
    }
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nouveau ticket</h2>}
        >
            <Head title="Créer un ticket" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <Flex>
                                    <Select placeholder='Type' name='type' onChange={handleChange}>
                                        {props.ticketTypes.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </Select>
                                    <Spacer />
                                    <Select placeholder='Priorité' name='priority' onChange={handleChange}>
                                        {props.ticketPriorities.map((priority) => (
                                            <option key={priority.id} value={priority.id}>{priority.name}</option>
                                        ))}
                                    </Select>
                                </Flex>
                                <br />
                                <div><Input placeholder='Title' name='title' onChange={handleChange} /></div>
                                <br />
                                <div><Textarea placeholder='Description' name='description' onChange={handleChange} /></div>
                                <br />
                                <Button type='submit' colorScheme='teal' variant='solid'>
                                    Enregistrer
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
