import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    console.log('id:',id)
    const savedAnecdote = await anecdoteService.update(id, votedAnecdote)
    const newAnecdotes = anecdotes.map(a => (a.id === id) ? savedAnecdote : a)
    dispatch(setAnecdotes(newAnecdotes))
  }
}

export default anecdoteSlice.reducer
