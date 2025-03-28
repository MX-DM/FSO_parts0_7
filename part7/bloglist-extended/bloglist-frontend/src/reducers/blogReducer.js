import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const inializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogToCreate) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blogToCreate)
        dispatch(appendBlog(createdBlog))
    }
}

export const deleteBlog = (blogToDelete) => {
    return async dispatch => {
        await blogService.remove(blogToDelete.id)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const updateBlog = (blogToUpdate) => {
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    return async dispatch => {
        await blogService.update(blogToUpdate.id, updatedBlog)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export default blogSlice.reducer
