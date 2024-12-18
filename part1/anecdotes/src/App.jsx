import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

  const totalVotes = votes.reduce((total, vote) => total + vote, 0);

  const clickHandlerNext = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const clickHandlerVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVote(votesCopy)
  }

  const getMostVoted = (votes) => {
    let current = votes[0]
    let mostVoted = 0
    for (let i = 0; i < votes.length ; i ++) {
      if (current < votes[i]) {
        mostVoted = i
        current = votes [i]
      }
    }
    return mostVoted
  }

  const mostVoted = getMostVoted(votes)
  console.log(mostVoted)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button text={'Next anecdote'} clickHandler={clickHandlerNext}/>
      <Button text={'Vote'} clickHandler={clickHandlerVote}/>
      <h1>Anecdote with most votes</h1>
      {totalVotes > 0 ?(
        <p>{anecdotes[mostVoted]}</p>
      ) : (
        <p>No votes yet!</p>
      )}
    </div>
  )
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

export default App