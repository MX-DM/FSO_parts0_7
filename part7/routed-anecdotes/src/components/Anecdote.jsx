/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <div>Has: {anecdote.votes} votes</div>
        <div>Author: {anecdote.author}</div>
        <div>More info at:
            <a href={anecdote.info}>{anecdote.info}</a>
        </div>
      </div>
    )
  }
  
export default Anecdote