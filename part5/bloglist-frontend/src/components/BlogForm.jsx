import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div> Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div> Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div> Url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default BlogForm
