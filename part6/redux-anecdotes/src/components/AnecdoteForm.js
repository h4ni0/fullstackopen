import { useDispatch } from "react-redux";
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";

const AnecdotesForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(setNotification(`You created '${content}'`, 5))
    }

    return (
        <form onSubmit={addAnecdote}>
            <input type="text" name="anecdote" />
            <button>Submit</button>
        </form>
    )
}

export default AnecdotesForm