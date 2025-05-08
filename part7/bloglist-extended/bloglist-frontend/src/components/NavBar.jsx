import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../components/Login'

const NavBar = ({ user, handleLogin, logOut }) => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar shadow-sm">
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                    <img
                        src="https://www.svgrepo.com/show/130741/blog.svg"
                        alt="logo"
                        style={{ width: '32px', height: '32px' }}
                    />
                    <span className="fw-bold text-light">Blapp</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto d-flex gap-3">
                        <Nav.Link as={Link} to="/" className="text-light">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/blogs" className="text-light">
                            Blogs
                        </Nav.Link>
                        <Nav.Link as={Link} to="/users" className="text-light">
                            Users
                        </Nav.Link>
                    </Nav>

                    <Nav className="ms-auto d-flex align-items-center gap-3">
                        {user ? (
                            <>
                                <span className="text-light small">{user.name} logged in</span>
                                <Button variant="outline-light" size="sm" onClick={logOut}>
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <NavDropdown title="Login" align="end" menuVariant="dark">
                                <div className="p-3" style={{ minWidth: '250px' }}>
                                    <Login onLogin={handleLogin} />
                                </div>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
