import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON } from '../graphQL/queries';
import { Button, TextField, Stack } from '@mui/material';
import { inputVariant, buttonVariant } from './constants';

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName('');
    setPhone('');
    setCity('');
    setStreet('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField
            id="name"
            value={name}
            label="Name"
            variant={inputVariant}
            onChange={({ target }) => setName(target.value)}
          />
          <TextField
            id="phone"
            value={phone}
            label="Phone"
            variant={inputVariant}
            onChange={({ target }) => setPhone(target.value)}
          />
          <TextField
            id="street"
            value={street}
            label="Street"
            variant={inputVariant}
            onChange={({ target }) => setStreet(target.value)}
          />
          <TextField
            id="city"
            value={city}
            label="City"
            variant={inputVariant}
            onChange={({ target }) => setCity(target.value)}
          />
          <Button variant={buttonVariant} type="submit">
            add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default PersonForm;
