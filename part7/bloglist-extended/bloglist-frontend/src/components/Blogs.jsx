import Blog from './Blog'

const Blogs = ({ blogs, currentUser, updateLikes, deleteBlog }) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(b =>
                <Blog key={b.id}
                    blog={{ ...b, user: b.user.id || b.user }}
                    updateLikes={() => updateLikes(b)}
                    deleteBlog={() => deleteBlog(b)}
                    currentUser={currentUser}
                />)}
        </div>
    )
}

export default Blogs
