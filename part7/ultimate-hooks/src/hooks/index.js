import axios from 'axios'
import { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [token, setTokenState] = useState(null)

  const setToken = newToken => {
    setTokenState(`Bearer ${newToken}`)
  }
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.error("Error fetching resources:", error)
      }
    }
    fetchResources()
  }, [baseUrl]) 
  
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    setResources(prevResources => [...prevResources, response.data])
    return response.data
  }
  
  const update = async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
    setResources(prevResources =>
      prevResources.map(res => res.id === id ? response.data : res)
    )
    return response.data
  }
  
  const remove = async (id) => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    setResources(prevResources => prevResources.filter(res => res.id !== id))
    return response.data
  }

  const service = {
    create, 
    update, 
    remove, 
    setToken
  }

  return [
    resources, service
  ]

}

export const useField = (type) => {
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
