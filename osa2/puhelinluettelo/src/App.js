import React, { useState, useEffect } from 'react';

import { AddForm } from './components/AddForm';
import { FilterForm } from './components/FilterForm';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';
import numberService from './service/numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterWord, setFilterWord] = useState('');
  const [notification, setNotification] = useState(null);

  const inputHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterHandler = (event) => {
    setFilterWord(event.target.value);
  };

  const notificationHandler = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Replace old num with new num
    if (persons.find((person) => person.name === newName)) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(message)) {
        // initialize the values passed to server
        let id = -1;
        let updatedPerson = { name: 'None', number: 'None' };

        // Create a new updated array for hook and update initial values for server call
        const copy = persons.map((person) => {
          if (person.name === newName) {
            id = person.id;
            updatedPerson = { ...person, number: newNumber };
            return updatedPerson;
          }
          return person;
        });

        numberService
          .update(id, updatedPerson)
          .then((response) => {
            setPersons(copy);
            notificationHandler(`Updated ${updatedPerson.name}`);
          })
          .catch((error) => {
            notificationHandler(`Error ${error.response.data}`);
          });
      }

      // exits handler function before creating a new person
      return;
    }

    // Create a new contact
    numberService
      .create({ name: newName, number: newNumber })
      .then((res) => {
        setPersons([...persons, res.data]);
        notificationHandler(`Added ${res.data.name}`);
      })
      .catch((error) => {
        notificationHandler(`Error : ${error.response.data.error}`);
      });
  };

  const deleteHandler = (id) => {
    const selectedPerson = persons.find((p) => p.id === id).name;
    const message = `Haluatko poistaa numeron ${selectedPerson}`;

    if (window.confirm(message)) {
      numberService
        .erase(id)
        .then((res) => {
          setPersons(persons.filter((item) => item.id !== id));
          notificationHandler(`Deleted ${selectedPerson}`);
        })
        .catch((error) => notificationHandler(`Error happened: ${error}`));
    }
  };

  const filterPhonebook = persons.filter((person) => {
    return person.name.toLowerCase().includes(filterWord.toLowerCase())
      ? true
      : false;
  });

  useEffect(() => {
    numberService
      .getAll()
      .then((response) => setPersons(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <FilterForm filterHandler={filterHandler} />
      <AddForm
        inputHandler={inputHandler}
        numberHandler={numberHandler}
        submitHandler={submitHandler}
      />
      <h2>Numbers</h2>
      <Persons list={filterPhonebook} buttonHandler={deleteHandler} />
    </div>
  );
};

export default App;
