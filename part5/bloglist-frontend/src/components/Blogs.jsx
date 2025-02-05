import Blog from './Blog'

const Blogs = ({ blogs }) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(b => <Blog key={b.id} blog={b} />)}
        </div>
    )
}

export default Blogs
