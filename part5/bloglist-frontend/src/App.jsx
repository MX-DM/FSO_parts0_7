import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
    const newBlog = ({ author: author, title: title, url: url })
    const savedBlog = await blogService.create(newBlog)
    console.log('Added: ', savedBlog)
    setBlogs(blogs.concat(savedBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
    setSuccessMessage(`Added the blog: ${savedBlog.title} successfully`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    }
    catch (error) {
      setErrorMessage(`${error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <>
    <h1>Blog App</h1>
    <ErrorMessage errorMessage={errorMessage}/>
    <SuccessMessage message={message}/>
    {user !== null 
      ? (
      <>
      <p>{user.name} logged-in</p>
      <Button text={'Log out'} clickHandler={logOut}/>
      <h2>Create new blog</h2>
      <BlogForm 
        newTitle={title} 
        setTitle={setTitle}
        newAuthor={author}
        setAuthor={setAuthor}
        newUrl={url}
        setUrl={setUrl}
        addBlog={addBlog}
        />
      <Blogs blogs={blogs}/>
      </>
      ) : ( 
      <>
      <h2>Log in to application</h2>
      <Login 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        onSubmit={handleLogin}
      />
      </>
      )}
    </>
  )
}

export default App
