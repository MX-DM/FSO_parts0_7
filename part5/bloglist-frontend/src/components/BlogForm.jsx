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
    <div className='formDiv'>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div> Title:
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div> Author:
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div> Url:
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm
