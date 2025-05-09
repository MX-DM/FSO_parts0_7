import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Blog = ({ blog, updateLikes, deleteBlog, currentUser }) => {
    const [details, setDetails] = useState(false);
    const toggleDetails = () => setDetails(!details);

    return (
        <Card className={`shadow-sm border-0 blog-card ${details ? 'expanded' : ''}`}>
            <Card.Body className="d-flex flex-column">
                <Card.Title>
                    <Link to={`/blogs/${blog.id}`} className="text-decoration-none text-primary fw-semibold fs-5">
                        {blog.title}
                    </Link>
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted small">{blog.author}</Card.Subtitle>

                {!details && (
                    <Button variant="primary" size="sm" onClick={toggleDetails} className="mt-auto">
                        View
                    </Button>
                )}

                <div className={`blog-details-wrapper ${details ? 'expanded' : 'collapsed'}`}>
                    {details && (
                        <>
                            <Card.Text className="mt-2 small text-break" data-testid="blog-url">
                                🌐URL: {blog.url}
                            </Card.Text>

                            <Card.Text data-testid="blog-likes" className="d-flex align-items-center small">
                                👍 Likes: {blog.likes}
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

                            <div className="mt-auto">
                                <Button variant="outline-secondary" size="sm" onClick={toggleDetails} className="me-2">
                                    Hide
                                </Button>

                                {currentUser === blog.user && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        id="delete-button"
                                        onClick={deleteBlog}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Blog;