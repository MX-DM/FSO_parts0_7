import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../components/Login'
import Button from '../components/Button'

const NavBar = ({ user, handleLogin, logOut }) => {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/blogs">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users">Users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {user !== null
                            ? (
                                <>
                                    <p>{user.name} logged-in
                                        <Button text={'Log out'} clickHandler={logOut}/>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <NavDropdown title="Login">
                                        <Login onLogin={handleLogin}/>
                                    </NavDropdown>
                                </>
                            )}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
