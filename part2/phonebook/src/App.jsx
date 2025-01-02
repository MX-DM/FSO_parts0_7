import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
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
    const repeatedPerson = persons.find(person => 
      person.name.toLowerCase() == (newName.toLowerCase()))
    
    const newPerson = {name: newName, number: newNumber}

    if (repeatedPerson){
      console.log('Repeated: ', repeatedPerson)

      if (window.confirm(`The name "${newName}" already exists in the phonebook. Update the old number with a new one?`)){
        personService
        .update(repeatedPerson.id, newPerson)
        .then(response => {
          console.log('Updated: ', response)
          setPersons(persons.map(p => p.id === repeatedPerson.id ? response : p))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error updating person:', error);
        })
      }
    }

    else{
      
      personService
      .create(newPerson)
      .then(returnedPerson => {
        console.log('Added: ', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error);
      })
    }
  
  }

  const deleteHandler = (id) => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete '${personToDelete.name}'?`)){
      personService
      .remove(id)
      .then(() => {
        console.log('Deleted: ', personToDelete)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.log('Error:', error)
        alert(`Failed to delete '${personToDelete.name}'. Please try again.`)
      })
    }
  }

  useEffect((() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }), [])


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
      <Persons persons={persons} filter={newFilter} clickHandler={deleteHandler}/>
      
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

const Persons = ({persons, filter, clickHandler}) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <ul>
    {filteredPersons.map((p,i) => <PersonLine key={i} id={p.id} name={p.name} number={p.number} clickHandler={clickHandler}/>)}
    </ul>
  )
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const PersonLine = ({id, name, number, clickHandler}) =>{
  return(
    <li>
      {name} {number} {}
      <Button text={"delete"} clickHandler={() => clickHandler(id)}/>
    </li>
    
  )
}

export default App