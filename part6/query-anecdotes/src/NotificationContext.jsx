/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "notify":
            return action.payload
        case "clearNotification":
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
          {props.children}
        </NotificationContext.Provider>
      )
    }

export default NotificationContext
