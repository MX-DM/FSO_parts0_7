import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === ''){
            return anecdotes
        }

        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const voteHandler = (id) => {
        dispatch(vote(id))
    }

    return (
        <div className='anecdotes'>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteHandler(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes
