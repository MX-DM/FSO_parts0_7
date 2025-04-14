import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import NavBar from './components/NavBar'
import blogService from './services/blogs'
import { notify } from './reducers/notificationReducer'
import usersService from './services/users'
import { createBlog, inializeBlogs, deleteBlog, updateBlog } from './reducers/blogReducer'
import { setUser, loginUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Container } from 'react-bootstrap'


const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const [users, setUsers] = useState([])

    var currentUser

    if (user === null) {
        currentUser = 0
    }
    else{
        currentUser = user.id
    }
    useEffect(() => {
        dispatch(inializeBlogs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            const data = await usersService.getAll()
            setUsers(data)
        }

        getUsers()
    }, [])

    const handleLogin = async (userCredentials) => {
        try {
            dispatch(loginUser(userCredentials))
            if (user) {
                dispatch(notify(`Welcome ${user.name}` ,'s', 5))
            }
        }
        catch (error) {
            console.log(error)
            dispatch(notify('Wrong credentials','e', 5))
        }

    }

    const addBlog = async (newBlog) => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(createBlog(newBlog))
            dispatch(notify(`Added the blog: ${newBlog.title} successfully`, 's', 5))
        }
        catch (error) {
            dispatch(notify('Every field must be given', 'e', 5))
        }
    }

    const updateLikes = async (blog) => {
        try {
            dispatch(updateBlog(blog))
        } catch (error) {
            console.log(error)
            dispatch(notify('Error updating likes', 'e', 5))
        }
    }

    const handleDeleteBlog = async (blog) => {
        try {
            if (window.confirm('Are you sure you want to delete this item?')) {
                dispatch(deleteBlog(blog))
                dispatch(notify(`Successfully deleted the blog: ${blog.title}`, 's', 5))
            }
        } catch (error) {
            console.log(error)
            dispatch(notify('Unauthorized deletion', 'e', 5))
        }
    }

    const logOut = () => {
        dispatch(setUser(null))
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    const blogFormRef = useRef()

    const blogMatch = useMatch('/blogs/:id')
    const blogView = blogMatch
        ? blogs.find(b => b.id === blogMatch.params.id)
        : null

    const userMatch = useMatch('/users/:id')
    const userView = userMatch
        ? users.find(u => u.id === userMatch.params.id)
        : null

    return (
        <Container fluid>
            <NavBar user={user} handleLogin={handleLogin} logOut={logOut}/>
            <h1>Blog App</h1>
            <Notification/>
            <Routes>
                <Route path="/" element={
                    <>
                        <div>Home page</div>
                    </>
                }/>
                <Route path="/users" element={<Users users={users}/>}/>
                <Route path="/users/:id" element={<User user={userView}/>}/>
                <Route path="/blogs/:id" element={<BlogView blog={blogView} updateLikes={updateLikes}/>}/>
                <Route path="/blogs" element={
                    <>
                        {user !== null
                            ? (
                                <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                                    <BlogForm
                                        createBlog={addBlog}
                                    />
                                </Togglable>

                            ) : (
                                <h3 style={{ margin: '20px' }}>Must be logged-in to create new blogs!</h3>
                            )}
                        <Blogs
                            blogs={[...blogs].sort((a, b) => b.likes - a.likes)}
                            deleteBlog={handleDeleteBlog}
                            updateLikes={updateLikes}
                            currentUser={currentUser}
                        />
                    </>
                }/>
            </Routes>
        </Container>
    )
}

export default App
