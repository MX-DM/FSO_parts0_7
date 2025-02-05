const Login = ({ username, setUsername, password, setPassword, onSubmit }) => {
    return (
        <div>
          <form onSubmit={onSubmit}>
            <div> Username:
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div> Password:
            <input
                type="text"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )
}

export default Login
