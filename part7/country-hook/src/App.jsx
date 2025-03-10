import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect( () => {
    const fetchCountry = async () => {
      if (name !== '') {
        try {
          const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          setCountry(response.data) 
        } catch (error) {
          console.error("Country not found", error)
          setCountry('notFound')
        }}

      else { 
        setCountry(null) 
      }
    }
    fetchCountry()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country === 'notFound') {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>Capital: {country.capital} </div>
      <div>Population: {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App