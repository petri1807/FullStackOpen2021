import { useState } from 'react';
import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS, PERSON_ADDED } from './graphQL/queries';
import { Container } from '@mui/material';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import './index.css';
import { buttonVariant } from './components/constants';
import { Button } from '@mui/material';

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);

      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <Container maxWidth="sm" className="container">
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="container">
      <Notify errorMessage={errorMessage} />
      <Button onClick={logout} variant={buttonVariant}>
        Log out
      </Button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </Container>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;
