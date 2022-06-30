import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const newAnecdote = {content, votes: 0}
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const vote = async (id) => {
    const toBeVotedResponse = await axios.get(`${baseUrl}/${id}`)
    const toBeVoted = toBeVotedResponse.data
    const voted = {...toBeVoted, votes: toBeVoted.votes + 1}
    const votedAnecdoteResponse = await axios.put(`${baseUrl}/${id}`, voted)
    return votedAnecdoteResponse.data
}

const anecdotesService = { getAll, create, vote }

export default anecdotesService