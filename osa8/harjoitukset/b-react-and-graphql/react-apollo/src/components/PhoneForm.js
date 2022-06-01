import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Stack } from '@mui/material';
import { inputVariant, buttonVariant } from './constants';

import { EDIT_NUMBER } from '../graphQL/queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const submit = async (event) => {
    event.preventDefault();
    changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('Person not fount');
    }
  }, [result.data]);

  return (
    <div>
      <h2>Change number</h2>
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
          <Button variant={buttonVariant} type="submit">
            Change number
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default PhoneForm;
