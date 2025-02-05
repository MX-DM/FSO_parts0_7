const BlogForm = ({ newTitle, setTitle, newAuthor, setAuthor, newUrl, setUrl, addBlog }) => {
    return (
    <form onSubmit={addBlog}>
      <div> Title: 
      <input
        value={newTitle}
        onChange={({ target }) => setTitle(target.value)}
      />
      </div>
      <div> Author: 
      <input
        value={newAuthor}
        onChange={({ target }) => setAuthor(target.value)}
      />
      </div>
      <div> Url: 
      <input
        value={newUrl}
        onChange={({ target }) => setUrl(target.value)}
      />
      </div>
      <button type="submit">Save</button>
    </form>
    )  
}

export default BlogForm
