import { useState } from 'react'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        onLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div> Username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id='username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div> Password:
                    <input
                        type="text"
                        value={password}
                        name="Password"
                        id='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
