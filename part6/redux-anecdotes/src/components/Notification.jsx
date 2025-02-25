import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    borderColor: 'black',
    padding: 10,
    borderWidth: 3,
    margin: 5
  }

  return (
    <>
    {notification === '' ? (
      null
    ) : (
      <div style={style}>
        {notification}
      </div>
    )}
    </>
  )
}

export default Notification
