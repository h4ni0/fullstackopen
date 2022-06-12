import { useState, useEffect } from 'react'
// import _ from 'lodash'
import axios from 'axios'

const Person = ({name, number}) => {
  return <div>{name} {number}</div>
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

const Persons = ({persons, search}) => persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <Person key={person.id} name={person.name} number={person.number} />)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const hook = () => {
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  }
  useEffect(hook, [])

  const add = (e) => {
    e.preventDefault()
    const newPerosn = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if(!persons.some(person => person.name.trim() === newPerosn.name.trim())) {
    setPersons(persons.concat(newPerosn))
    setNewName("")
    setNewNumber("")
    } else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm add={add} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App