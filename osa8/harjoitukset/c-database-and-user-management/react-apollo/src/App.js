import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './graphQL/queries';
import { Container } from '@mui/material';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import './index.css';
import { buttonVariant } from './components/constants';
import { Button } from '@mui/material';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });
  const client = useApolloClient();

  if (result.loading) {
    return <div>loading...</div>;
  }

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
