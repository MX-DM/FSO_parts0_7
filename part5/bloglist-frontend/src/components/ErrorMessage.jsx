const ErrorMessage = ({errorMessage}) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="messageError">
      {errorMessage}
    </div>
  )

}

export default ErrorMessage
