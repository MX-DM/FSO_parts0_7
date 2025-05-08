import Blog from './Blog'
import { Container } from 'react-bootstrap'

const Blogs = ({ blogs, currentUser, updateLikes, deleteBlog }) => {
    return (
        <Container className="my-5">
            {blogs.map(b =>
                <Blog key={b.id}
                    blog={{ ...b, user: b.user.id || b.user }}
                    updateLikes={() => updateLikes(b)}
                    deleteBlog={() => deleteBlog(b)}
                    currentUser={currentUser}
                />
            )}
        </Container>
    )
}

export default Blogs