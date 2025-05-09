import { Table, Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UsersIcon } from 'lucide-react'

const Users = ({ users }) => {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="users-card shadow-sm w-100 p-4" style={{ maxWidth: '850px', backgroundColor: '#f6faff' }}>
                <Card.Body>
                    <div className="text-center mb-4">
                        <UsersIcon size={36} className="text-primary mb-2" />
                        <h2 className="fw-bold text-primary">Registered Users</h2>
                        <p className="text-muted">List of users and the number of blogs they’ve created</p>
                    </div>

                    <Table responsive hover className="users-table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th className="text-center">Blogs Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>
                                        <Link to={`/users/${user.id}`} className="text-decoration-none text-primary fw-semibold">
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <Badge bg="info" pill>
                                            {user.blogs.length}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Users;