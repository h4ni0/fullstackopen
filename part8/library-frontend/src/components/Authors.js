import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
    const response = useQuery(ALL_AUTHORS)

    // edit author
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const handleEditAuthor = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const setBornTo = e.target.setBornTo.value
        editAuthor({
            variables: { name, setBornTo: Number(setBornTo) },
        })
        e.target.setBornTo.value = ''
    }

    if (response.loading) return <div>Loading...</div>
    const authors = response.data.allAuthors
    return !props.show ? null : (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Set birthyear</h2>
            <form onSubmit={handleEditAuthor}>
                <select name="name">
                    {authors.map((author) => (
                        <option key={author.id} value={author.name}>
                            {author.name}
                        </option>
                    ))}
                </select>
                <input type="number" name="setBornTo" />
                <button>update author</button>
            </form>
        </div>
    )
}

export default Authors
