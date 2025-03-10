/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const AnecdoteForm = (props) => {  
 
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset={undefined} />
        </div>
        <div>
          author
          <input {...author} reset={undefined} />
        </div>
        <div>
          url for more info
          <input {...info}  reset={undefined} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button> 
      </form>
    </div>
  )

}

export default AnecdoteForm