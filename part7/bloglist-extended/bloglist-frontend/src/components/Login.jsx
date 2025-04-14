import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    name="Username"
                    id='username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="text"
                    value={password}
                    name="Password"
                    id='password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-2'>
                 Login
            </Button>
        </Form>
    )
}

export default Login
