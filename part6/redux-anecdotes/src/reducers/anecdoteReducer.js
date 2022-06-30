import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        voteUi(state, action) {
            const id = action.payload
            const votedAnecdote = state.find(anecdote => anecdote.id === id)
            votedAnecdote.votes = votedAnecdote.votes + 1
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})



export const { appendAnecdote, setAnecdotes, voteUi } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const create = (content) => {
    return async dispatch => {
        const anecdote = await anecdotesService.create(content)
        dispatch(appendAnecdote(anecdote))
    }
}

export const vote = (id) => {
    return async dispatch => {
        anecdotesService.vote(id)
        dispatch(voteUi(id))
    }
}


export default anecdoteSlice.reducer