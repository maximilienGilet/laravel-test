import { useForm } from '@inertiajs/inertia-react';
import { Flex, Select, Spacer, Input, Textarea, Button } from "@chakra-ui/react";
import { redirect } from '@inertiajs/inertia-react';

const TicketForm = ({ ticket, ticketTypes, ticketPriorities, submitRoute }) => {

  const { data, setData, errors, post } = useForm(ticket);

  console.log(errors);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData(key, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault;
    post(route(submitRoute)).then(() => {
      
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex>
        <Select placeholder='Type' name='type' onChange={handleChange}>
          {ticketTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </Select>
        <Spacer />
        <Select placeholder='Priorité' name='priority' onChange={handleChange}>
          {ticketPriorities.map((priority) => (
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
  );
}

export default TicketForm;