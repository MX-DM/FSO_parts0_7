import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Blog = ({ blog, updateLikes, deleteBlog, currentUser }) => {
    const [details, setDetails] = useState(false);
    const toggleDetails = () => setDetails(!details);

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title>
                    <Link to={`/blogs/${blog.id}`} className="text-decoration-none text-dark fw-bold">
                        {blog.title}
                    </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>

                {!details && (
                    <Button variant="outline-primary" size="sm" onClick={toggleDetails}>
                        View
                    </Button>
                )}

                {details && (
                    <>
                        <Card.Text className="mt-2" data-testid="blog-url">
                            {blog.url}
                        </Card.Text>

                        <Card.Text data-testid="blog-likes">
                            Likes: {blog.likes}
                            {currentUser !== 0 && (
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="ms-2"
                                    id="like-button"
                                    onClick={updateLikes}
                                >
                                    Like
                                </Button>
                            )}
                        </Card.Text>

                        <Button variant="outline-secondary" size="sm" onClick={toggleDetails} className='me-2'>
                            Hide
                        </Button>

                        {currentUser === blog.user && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                id="delete-button"
                                onClick={deleteBlog}
                                className="me-2"
                            >
                                Delete
                            </Button>
                        )}
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default Blog;