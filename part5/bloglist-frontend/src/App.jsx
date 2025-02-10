import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import Button from './components/Button'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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

  const handleLogin = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }
    catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
      console.log('Added: ', savedBlog)
      setBlogs(blogs.concat(savedBlog))
      setSuccessMessage(`Added the blog: ${savedBlog.title} successfully`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (error) {
      setErrorMessage('Every field must be given')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
    } catch (error) {
      console.log(error)
      setErrorMessage('Error updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setSuccessMessage(`Successfully deleted the blog: ${blog.title}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Error deleting the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const blogFormRef = useRef()

  return (
    <>
      <h1>Blog App</h1>
      <ErrorMessage errorMessage={errorMessage}/>
      <SuccessMessage message={message}/>
      {user !== null
        ? (
          <>
            <p>{user.name} logged-in
              <Button text={'Log out'} clickHandler={logOut}/>
            </p>
            <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
          </>
        ) : (
          <>
            <Togglable buttonLabel='Log in'>
              <Login
                onLogin={handleLogin}
              />
            </Togglable>
          </>
        )}
      <Blogs
        blogs={[...blogs].sort((a, b) => b.likes - a.likes)}
        setBlogs={setBlogs}
        deleteBlog={deleteBlog}
        updateLikes={updateLikes}
      />
    </>
  )
}

export default App
