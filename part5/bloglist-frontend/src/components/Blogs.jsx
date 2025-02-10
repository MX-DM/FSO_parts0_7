import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, updateLikes, deleteBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(b => <Blog key={b.id} blog={b} updateLikes={() => updateLikes(b)} deleteBlog={() => deleteBlog(b)} />)}
    </div>
  )
}

export default Blogs
