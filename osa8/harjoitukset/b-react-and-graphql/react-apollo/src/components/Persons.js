import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PERSON } from '../graphQL/queries';
import { Button, Box, Stack } from '@mui/material';

const Person = ({ person, onClose }) => {
  return (
    <Box>
      <h2>{person.name}</h2>
      <Box>
        {person.address.street} {person.address.city}
      </Box>
      <Box>{person.phone}</Box>
      <Button variant="outlined" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <Stack spacing={2}>
      <h2>Persons</h2>
      {persons.map((p) => (
        <Box
          key={p.name}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {p.name} {p.phone}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setNameToSearch(p.name)}
          >
            show details
          </Button>
        </Box>
      ))}
    </Stack>
  );
};

export default Persons;
