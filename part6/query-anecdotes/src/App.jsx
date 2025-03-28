import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests/requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: "notify", payload: `You voted for: ${updatedAnecdote.content}`})
      setTimeout(() => dispatch({ type: "clearNotification" }), 5000)
    },
  })

  const vote = (anecdote) => {
    updateAnecdoteMutation.mutate( {...anecdote, votes: anecdote.votes + 1} )
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return (
    <div>Anecdotes data is unavilable
      <p>Error: {error.message}</p>
    </div>
    )
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
