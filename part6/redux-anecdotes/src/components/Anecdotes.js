import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdotes = () => {
    const dispatch = useDispatch()

    
    let anecdotes = useSelector(state => state.anecdotes)
    let filter = useSelector(state => state.filter)
    anecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    
    const voteAnecdote = (id) => {
        dispatch(vote(id))
        const anecdote = anecdotes.find(anec => anec.id === id).content
        dispatch(setNotification(`You voted '${anecdote}'`, 5))
    }

    return (
       <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
       </div> 
    )
}


export default Anecdotes