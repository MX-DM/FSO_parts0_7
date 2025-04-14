import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../components/Login'

const NavBar = ({ user, handleLogin, logOut }) => {
    return(
        <Navbar collapseOnSelect expand="lg" variant="dark" className='custom-navbar'>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto ms-3">
                    <Nav.Link href="#" as="span">
                        <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/blogs">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users">Users</Link>
                    </Nav.Link>
                </Nav>
                <Nav className='ms-auto me-4 align-items-center'>
                    {user !== null
                        ? (
                            <Nav.Item className='d-flex align-items-center gap-2'>
                                <span className="text-white">{user.name} logged-in</span>
                                <Button variant="primary" size='sm' onClick={logOut}>Log out</Button>
                            </Nav.Item>
                        ) : (
                            <NavDropdown title="Login" drop="start">
                                <div className='custom-login-dropdown'>
                                    <Login onLogin={handleLogin}/>
                                </div>
                            </NavDropdown>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
