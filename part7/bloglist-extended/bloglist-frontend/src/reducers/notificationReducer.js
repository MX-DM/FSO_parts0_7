import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: { content: null, type: null },
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state) {
            return { content: null, type: null }
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (content, type, time) => {
    return async dispatch => {
        dispatch(setNotification({ content, type }))

        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
