import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const capitalizeEachWord = (sentence) => {
  const words = sentence.split(' ');

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const findSamePerson = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase();
    });

    if (findSamePerson) {
      const confirmChange = confirm(
        `${findSamePerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmChange) {
        const changedPerson = { ...findSamePerson, number: newPhoneNumber };
        personService
          .changePerson(findSamePerson.id, changedPerson)
          .then((receivedChangedPerson) => {
            setSuccessMessage(
              `Person '${receivedChangedPerson.name}' was changed`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setPersons(
              persons.map((person) =>
                person.id === findSamePerson.id ? receivedChangedPerson : person
              )
            );
          })
          .catch((error) => {
            setError(true);
            setSuccessMessage(`${error.message}`);
            setTimeout(() => {
              setError(false);
              setSuccessMessage(null);
            }, 5000);
          });
      }
      return;
    }

    const newPerson = {
      name: capitalizeEachWord(newName),
      number: newPhoneNumber,
    };
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setSuccessMessage(`Person '${returnedPerson.name}' was added`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhoneNumber('');
      })
      .catch((error) => {
        setError(true);
        setSuccessMessage(`${error.message}`);
        setTimeout(() => {
          setError(false);
          setSuccessMessage(null);
        }, 5000);
      });
  };

  const handleDelete = (id) => {
    const personNote = persons.find((person) => person.id === id).name;
    const confirmDelete = confirm(
      `Do you want to delete a book entry ${personNote}?`
    );
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setSuccessMessage(`Person '${personNote}' was deleted`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setError(true);
          setSuccessMessage(`${error.message}`);
          setTimeout(() => {
            setError(false);
            setSuccessMessage(null);
          }, 5000);
        });
    }
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const filteredPersons =
    filter !== ''
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <Notification message={successMessage} error={error} />
      <h2>Phonebook</h2>
      <Filter filterValue={filter} onChangeFilter={changeFilter} />

      <h2>Add a new</h2>
      <PersonForm
        newNameValue={newName}
        onChangeNewName={changeNewName}
        newPhoneNumberValue={newPhoneNumber}
        onChangeNewPhoneNumber={changeNewPhoneNumber}
        onFormSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
