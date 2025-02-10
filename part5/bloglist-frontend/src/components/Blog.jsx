import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
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
          <Button text='View' clickHandler={toggleDetails}/>
        </p>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <p style={pStyle}>{blog.title} {blog.author}
          <Button text='Hide' clickHandler={toggleDetails}/>
        </p>
        <p style={pStyle} data-testid='blog-url'>{blog.url}</p>
        <p style={pStyle} data-testid='blog-likes' >Likes: {blog.likes}
          <Button text={'Like'} clickHandler={updateLikes}/>
        </p>
        <p style={pStyle}>{blog.user.name}
        </p>
        <Button text={'Delete'} clickHandler={deleteBlog}/>
      </div>
    </div>
  )

}

export default Blog
