import { useForm } from '@inertiajs/inertia-react';
import { Flex, Select, Spacer, Input, Textarea, Button } from "@chakra-ui/react";
import { redirect } from '@inertiajs/inertia-react';

const TicketForm = ({ ticket, ticketTypes, ticketPriorities, submitRoute }) => {

  const { setData, errors, post, processing, clearErrors } = useForm(ticket);

  console.log(errors);

  const handleChange = (e) => {
    const key = e.target.name;
    let value = e.target.value;
    // set id values as integers
    if (key.includes('_id')) {
      value = parseInt(value);
    }
    setData(key, value);
    clearErrors('field', key);
  }

  const handleSubmit = (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    post(route(submitRoute), {
      preserveScroll: true,
    });

    console.log('print after post');
  }

  return (
    <form onSubmit={handleSubmit} disabled={processing}>
      <Flex>
        <Select placeholder='Type' name='type_id' onChange={handleChange} isInvalid={errors['type_id']}>
          {ticketTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </Select>
        <Spacer />
        <Select placeholder='Priorité' name='priority_id' onChange={handleChange} isInvalid={errors['priority_id']}>
          {ticketPriorities.map((priority) => (
            <option key={priority.id} value={priority.id}>{priority.name}</option>
          ))}
        </Select>
      </Flex>
      <br />
      <div><Input placeholder='Title' name='title' onChange={handleChange} isInvalid={errors['title']} /></div>
      <br />
      <div><Textarea placeholder='Description' name='description' onChange={handleChange} isInvalid={errors['description']} /></div>
      <br />
      <Button type='submit' colorScheme='teal' variant='solid'>
        Enregistrer
      </Button>
    </form>
  );
}

export default TicketForm;
