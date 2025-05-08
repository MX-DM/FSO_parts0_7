import { useState } from 'react'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../components/Login'

const NavBar = ({ user, handleLogin, logOut }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <Navbar expand="lg" variant="dark" className="custom-navbar shadow-sm">
                <Container fluid className="px-4">
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                        <img
                            src="https://www.svgrepo.com/show/130741/blog.svg"
                            alt="logo"
                            style={{ width: '32px', height: '32px' }}
                        />
                        <span className="fw-bold text-light">Blapp</span>
                    </Navbar.Brand>

                    {/* Only show sidebar toggle on small screens */}
                    <Button
                        variant="outline-light"
                        className="d-lg-none ms-auto"
                        onClick={() => {
                            if (sidebarOpen) {
                                setSidebarOpen(false)
                            }
                            else {
                                setSidebarOpen(true)
                            }
                        }}
                    >
                        ☰
                    </Button>

                    {/* Standard nav for large screens */}
                    <Nav className="d-none d-lg-flex me-auto gap-3">
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

                    <Nav className="ms-auto d-none d-lg-flex align-items-center gap-3">
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
                </Container>
            </Navbar>

            {/* Custom sidebar drawer */}
            <div className={`custom-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                        <img
                            src="https://www.svgrepo.com/show/130741/blog.svg"
                            alt="logo"
                            style={{ width: '32px', height: '32px' }}
                        />
                        <span className="fw-bold text-light">Blapp</span>
                    </Navbar.Brand>
                    <Button variant="" className="text-light fs-4" onClick={() => setSidebarOpen(false)}>
                        ✕
                    </Button>
                </div>

                <Nav className="flex-column gap-3">
                    <Nav.Link as={Link} to="/" onClick={() => setSidebarOpen(false)} className="text-light">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/blogs" onClick={() => setSidebarOpen(false)} className="text-light">
                        Blogs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/users" onClick={() => setSidebarOpen(false)} className="text-light">
                        Users
                    </Nav.Link>

                    {!user ? (
                        <NavDropdown title={<span className="custom-nav-hamburger-title">Login</span>}  align="end" menuVariant="dark" drop="down-centered">
                            <div className="p-3" style={{ minWidth: '250px' }}>
                                <Login onLogin={handleLogin} />
                            </div>
                        </NavDropdown>
                    ) : (
                        <div className="mt-3">
                            <span className="text-light small">{user.name} logged in</span>
                            <Button variant="outline-light" size="sm" onClick={logOut} className="mt-2">
                                Log out
                            </Button>
                        </div>
                    )}
                </Nav>
            </div>
        </>
    )
}

export default NavBar
