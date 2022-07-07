import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'
import Authors from './Authors'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    })

    const submit = async (event) => {
        event.preventDefault()
        console.log({ data, loading, error })
        createBook({
            variables: {
                title,
                published: Number(published),
                author,
                genres,
            },
        })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return !props.show ? null : (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
