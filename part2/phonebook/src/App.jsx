import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const changeNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterHandler = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const isRepeated = persons.some(person => 
      person.name.toLowerCase() == (newName.toLowerCase()))
    
    if (isRepeated){
      alert(`The name "${newName}" already exists in the phonebook.`)
    }
    else{
      const newPerson = {name: newName, number: newNumber}
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} changeFilterHandler={changeFilterHandler}/>
      <h2>Add new person</h2>
      <PersonForm 
        changeNameHandler={changeNameHandler} 
        changeNumberHandler={changeNumberHandler} 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
      
    </div>
  )
}

const Filter = ({newFilter, changeFilterHandler}) => {
  return (
    <div>Filter names that contain: 
      <input value={newFilter} onChange={changeFilterHandler}/>
    </div>
  )
}

const PersonForm = ({changeNumberHandler, changeNameHandler, addPerson, newName, newNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={changeNameHandler}/></div>
        <div>number: <input value={newNumber} onChange={changeNumberHandler}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

const Persons = ({persons, filter}) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <ul>
    {filteredPersons.map((p,i) => <PersonLine key={i} name={p.name} number={p.number}/>)}
    </ul>
  )
}

const PersonLine = ({name, number}) =>{
  return(
    <li>{name} {number}</li>
  )
}

export default App