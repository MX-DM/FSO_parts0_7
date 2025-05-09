import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap';

const User = ({ user }) => {
    if (!user) {
        return (
            <Container className="user-view-container text-center mt-5">
                <h5>Loading user...</h5>
            </Container>
        );
    }

    return (
        <Container className="user-view-container d-flex justify-content-center mt-5">
            <Card className="user-card shadow-sm p-4 w-100" style={{ maxWidth: '600px', backgroundColor: '#f8fbff' }}>
                <Card.Body>
                    <Card.Title className="text-center fs-3 mb-4 text-primary">{user.name}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted text-center">Created Blogs</Card.Subtitle>

                    <ListGroup variant="flush" className="mb-3">
                        {user.blogs.map((b) => (
                            <ListGroup.Item key={b.id} className="bg-light rounded mb-4 px-3 py-2">
                                <strong>{b.title}</strong> <span className="text-muted">by {b.author}</span>
                            </ListGroup.Item>
                        ))}
                        {user.blogs.length === 0 && (
                            <p className="text-muted text-center mt-3">No blogs created yet.</p>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default User;
