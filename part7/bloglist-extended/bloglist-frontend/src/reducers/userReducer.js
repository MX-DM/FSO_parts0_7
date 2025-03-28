import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { jwtDecode } from 'jwt-decode'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    }
})

export const { setUser } = userSlice.actions

export const loginUser = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(user)
        )
        const decodedToken = jwtDecode(user.token)
        user.id = decodedToken.id
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export default userSlice.reducer
