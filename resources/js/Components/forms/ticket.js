import { useForm } from '@inertiajs/inertia-react';
import { Select, Spacer, Input, Textarea, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TicketForm = ({ ticket, ticketTypes, ticketPriorities, submitRoute, submitMethod, saveText = "Enregistrer" }) => {

  const { t } = useTranslation();

  const { setData, errors, processing, clearErrors, submit } = useForm(ticket);

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

    submit(submitMethod ?? "post", submitRoute, { preserveScroll: true });

    // post(route(submitRoute), {
    //   preserveScroll: true,
    // });

    // console.log('print after post');
  }

  return (
    <form onSubmit={handleSubmit} disabled={processing}>


      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <FormControl isRequired>
          <FormLabel htmlFor='type_id'>Type</FormLabel>
          <Select placeholder='Type' name='type_id' onChange={handleChange} defaultValue={ticket.type_id} isInvalid={errors['type_id']} maxWidth="80">
            {ticketTypes.map((type) => (
              <option key={type.id} value={type.id}>{t(type.name)}</option>
            ))}
          </Select>
          {/* {errors['type_id'] && ( */}
          <FormErrorMessage>{errors['type_id']}</FormErrorMessage>
          {/* )} */}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='priority_id'>Priorité</FormLabel>
          <Select placeholder='Priorité' name='priority_id' onChange={handleChange} defaultValue={ticket.priority_id} isInvalid={errors['priority_id']} maxWidth="40">
            {ticketPriorities.map((priority) => (
              <option key={priority.id} value={priority.id}>{t(priority.name)}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Spacer />

      <br />
      <FormControl isRequired>
        <FormLabel htmlFor='title'>Titre</FormLabel>
        <Input placeholder='Title' name='title' onChange={handleChange} defaultValue={ticket.title} isInvalid={errors['title']} />
      </FormControl>
      <br />
      <FormControl isRequired>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <FormHelperText>
          Veuillez décrire votre demande
        </FormHelperText>
        <Textarea placeholder='Description' name='description' onChange={handleChange} defaultValue={ticket.description} isInvalid={errors['description']} />
      </FormControl>
      <br />
      <Button type='submit' colorScheme='teal' variant='solid'>
        {saveText}
      </Button>
    </form>
  );
}

export default TicketForm;
