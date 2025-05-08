import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        onLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <Form onSubmit={onSubmit} className="dropdown-login-form p-3">
            <Form.Group className="mb-2">
                <Form.Label className="text-white-80 small mb-1">Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    className="text-white border-0"
                    placeholder="Enter username"
                />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label className="text-white-80 small mb-1">Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    className="text-white border-0"
                    placeholder="Enter password"
                />
            </Form.Group>
            <Button type="submit" variant="primary" size="sm" className="w-100 mt-2">
                Login
            </Button>
        </Form>
    )
}

export default Login