import CommentSection from './CommentSection'

const BlogView = ({ blog, updateLikes, updateComments }) => {
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
            <CommentSection blog={blog} updateComments={updateComments}/>
        </div>

    )
}

export default BlogView
