import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CommentSection from './CommentSection';

const BlogView = ({ blog, updateLikes, updateComments }) => {
    if (!blog) return <p>Loading Blog...</p>;

    return (
        <Container className="blogview-container mt-4">
            <Row className="justify-content-center">
                <Col lg={10} xl={9}>
                    <Card className="blogview-card shadow-lg border-0 rounded-3">
                        <Card.Body className="blogview-body">
                            <Card.Title className="blogview-title text-center fw-bold fs-2 mb-3">
                                {blog.title}
                            </Card.Title>
                            <Card.Subtitle className="blogview-subtitle text-center mb-4 fs-6">
                                By {blog.author}
                            </Card.Subtitle>

                            <div className="blogview-details mb-4">
                                <p className="fs-5">
                                    <strong>Likes:</strong> {blog.likes}{' '}
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="blogview-like-button ms-2"
                                        onClick={() => updateLikes(blog)}
                                    >
                                        Like
                                    </Button>
                                </p>

                                <p className="fs-5">
                                    <strong>Blog URL:</strong>{' '}
                                    <a
                                        href={blog.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="blogview-link"
                                    >
                                        {blog.url}
                                    </a>
                                </p>

                                <p className="fs-5">
                                    <strong>Added by:</strong> {blog.user.name}
                                </p>
                            </div>

                            <div className="blogview-comments">
                                <CommentSection blog={blog} updateComments={updateComments} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogView;