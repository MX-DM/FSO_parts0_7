import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        notify(state, action) {
            return action.payload
        },
        // eslint-disable-next-line no-unused-vars
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { notify, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
