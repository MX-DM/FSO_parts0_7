import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify, clearNotification } from '../reducers/notificationReducer'

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
        const votedAnecdote = anecdotes.find(a => a.id === id)
        dispatch(notify(`You voted for '${votedAnecdote.content}'`))
        setTimeout( () => {
            dispatch(clearNotification())
        }, 5000)
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
