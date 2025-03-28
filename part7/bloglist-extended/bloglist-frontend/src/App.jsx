import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Button from './components/Button'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { notify } from './reducers/notificationReducer'
import { createBlog, inializeBlogs, setBlogs, deleteBlog, updateBlog } from './reducers/blogReducer'
import { setUser, loginUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

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

    return (
        <>
            <h1>Blog App</h1>
            <Notification/>
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
                deleteBlog={handleDeleteBlog}
                updateLikes={updateLikes}
                currentUser={currentUser}
            />
        </>
    )
}

export default App
