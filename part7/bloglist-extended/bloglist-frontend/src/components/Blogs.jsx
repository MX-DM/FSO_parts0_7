import Blog from './Blog'
import { Container, Row, Col } from 'react-bootstrap'

const Blogs = ({ blogs, currentUser, updateLikes, deleteBlog }) => {
    return (
        <Container className="my-5">
            <Row className="g-4">
                {blogs.map(b => (
                    <Col key={b.id} xs={12} sm={6} md={4}>
                        <Blog
                            blog={{ ...b, user: b.user.id || b.user }}
                            updateLikes={() => updateLikes(b)}
                            deleteBlog={() => deleteBlog(b)}
                            currentUser={currentUser}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Blogs