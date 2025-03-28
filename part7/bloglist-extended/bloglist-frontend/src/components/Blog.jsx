import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, currentUser }) => {
    const [details, setDetails] = useState(false)
    const toggleDetails = () => setDetails(!details)

    const hideWhenVisible = { display: details ? 'none' : '' }
    const showWhenVisible = { display: details ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const pStyle = {
        color: 'green',
        fontSize: 16,
        margin: 3
    }
    return (
        <div className='blog' style={blogStyle}>
            <div style={hideWhenVisible} className='blog-summary'>
                <p style={pStyle}>{blog.title} {blog.author}
                    <button onClick={toggleDetails}>View</button>
                </p>
            </div>
            <div style={showWhenVisible} className='blog-details'>
                <p style={pStyle}>{blog.title} {blog.author}
                    <button onClick={toggleDetails}>Hide</button>
                </p>
                <p style={pStyle} data-testid='blog-url'>{blog.url}</p>
                {currentUser !== 0 ? (
                    <p style={pStyle} data-testid='blog-likes' >Likes: {blog.likes}
                        <button id='like-button' onClick={updateLikes}>Like</button>
                    </p>
                ) : (
                    <p style={pStyle} data-testid='blog-likes' >Likes: {blog.likes} </p>
                )}
                {currentUser === blog.user ? (
                    <button id='delete-button' onClick={deleteBlog}>Delete</button>
                ):(
                    <></>
                )}
            </div>
        </div>
    )

}

export default Blog
