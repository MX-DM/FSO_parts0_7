const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="messageSuccess">
      {message}
    </div>
  )

}

export default SuccessMessage
