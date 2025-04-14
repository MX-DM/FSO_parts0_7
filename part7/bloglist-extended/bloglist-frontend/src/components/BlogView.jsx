const BlogView = ({ blog, updateLikes }) => {
    if (!blog) return <p>Loading Blog...</p>
    return(
        <div>
            <h2>{blog.title} By {blog.author}</h2>

            <p>Likes: {blog.likes}
                <button id='like-button' onClick={() => updateLikes(blog)}>Like</button>
            </p>
            <p>Blog URL:
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>Added by: {blog.user.name}</p>
        </div>
    )
}

export default BlogView
