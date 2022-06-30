import { useDispatch } from "react-redux";
import { create } from '../reducers/anecdoteReducer'
import { reset, set } from "../reducers/notificationReducer";

const AnecdotesForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(set(`You created '${content}'`))
        setTimeout(() => {
            dispatch(reset())
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input type="text" name="anecdote" />
            <button>Submit</button>
        </form>
    )
}

export default AnecdotesForm