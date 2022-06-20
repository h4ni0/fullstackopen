import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, removePerson}) => {
  return <div>{person.name} {person.number} <button onClick={() => removePerson(person._id)}>delete</button></div>
}

const Filter = ({search, setSearch}) => <div>filter shown with <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/></div> 

const PersonForm = ({add, newName, setNewName, newNumber, setNewNumber}) => {
  return  (
      <form onSubmit={add}>
        <div>
          name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>number: <input type="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
}

const Persons = ({persons, search, removePerson}) => persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <Person removePerson={removePerson} key={person._id} person={person}/>)

const Alert = ({ alert }) => {
  if (alert) return <div className='alert'>{alert}</div>
  else return
}

const RedAlert = ({redAlert}) => {
  if (redAlert) return <div className='redAlert'>{redAlert}</div>
  else return
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [alert, setAlert] = useState('')
  const [redAlert, setRedAlert] = useState('')

  const hook = () => {
    personService.getAll().then(allPersons => setPersons(allPersons))
  }
  useEffect(hook, [])

  const add = (e) => {
    e.preventDefault()
    const newPerosn = {
      name: newName,
      number: newNumber
    }

    if(!persons.some(person => person.name.trim() === newPerosn.name.trim())) {
      personService.create(newPerosn).then(createdPerson => setPersons(persons.concat(createdPerson)))
      setNewName("")
      setNewNumber("")
      setAlert("Added " + newPerosn.name)
      setTimeout(() => {
        setAlert("")
      }, 3000);
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        personService.update(persons.find(person => person.name.trim() === newPerosn.name.trim())._id, newPerosn).then( res =>
          setPersons(persons.map(person => person.name.trim() !== newPerosn.name.trim() ? person : res))
        ).catch(err => {
          setRedAlert("Information of " + newName + " has already been removed from server")
        })
        setNewName("")
        setNewNumber("")
      }
    }

  }


  const removePerson = (id) => {
    if(window.confirm(`delete ${persons.find(person => person._id === id).name}`)) personService
      .remove(id)
      .then(setPersons(persons.filter((person) => person._id !== id)))
      .catch((err) => {
        setRedAlert(
          "This user has already been removed from server"
        );
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert alert={alert}/>
      <RedAlert redAlert={redAlert} />
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm add={add} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons removePerson={removePerson} persons={persons} search={search} />
    </div>
  )
}

export default App