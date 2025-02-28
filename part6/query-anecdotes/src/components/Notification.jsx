import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  console.log('Notification state:', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    notification !== '' ? (
      <div style={style}>
        {notification}
      </div>
    ) : (
      <></>
    )
  )
}

export default Notification
