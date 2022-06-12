import { useState } from 'react'
import _ from 'lodash'

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

const Persons = ({persons, search}) => persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <Person key={person.name} name={person.name} number={person.number} />)

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const add = (e) => {
    e.preventDefault()
    const newPerosn = {
      name: newName,
      number: newNumber
    }

    if(!persons.some(person => _.isEqual(person, newPerosn))) {
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