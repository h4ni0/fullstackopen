import { useState } from 'react'
import { create } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const BlogForm = ({ user, sendNotification }) => {
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogHandle = async (e) => {
        e.preventDefault()
        dispatch(create({ title, author, url }, user.token))
        setTitle('')
        setAuthor('')
        setUrl('')
        sendNotification('a new blog ' + title + ' added', false)
    }

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    return (
        <div>
            <button onClick={toggleVisibility} style={hideWhenVisible}>
                new blog
            </button>
            <div style={showWhenVisible}>
                <h1>create new</h1>
                <form onSubmit={blogHandle}>
                    <div>
                        title:{' '}
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:{' '}
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:{' '}
                        <input
                            type="text"
                            name="url"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button id="submit">create</button>
                </form>
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default BlogForm
