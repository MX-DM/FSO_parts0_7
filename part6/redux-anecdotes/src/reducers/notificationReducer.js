import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
    }
})

export const { setNotification } = notificationSlice.actions

export const notify = (content, time) => {
    return async dispatch => {
        dispatch(setNotification(content))
        
        setTimeout(() => {
            dispatch(setNotification(''))
        }, time * 1000)
    }
}

export default notificationSlice.reducer
