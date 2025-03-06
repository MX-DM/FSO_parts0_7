/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
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
