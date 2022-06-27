import { useState } from 'react'
import '../index.css'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
    const [open, setOpen] = useState(false)
    const [counter, setCounter] = useState(blog.likes)
    const [deleted, setDeleted] = useState(false)
    const toggleOpen = () => {setOpen(!open)}

    const like = async () => {
        const newBlog = {
            ...blog,
            likes: counter + 1
        }
        await blogService.update(blog._id, newBlog, user.token)
        setCounter(counter + 1)

    }

    const removeBlog = () => {
        if (window.confirm('remove blog ' + blog.title)) {
            blogService.remove(blog._id, user.token)
            setDeleted(true)
        }
    }

    return (
        <div className="bordered" style={{ display: deleted ? 'none': '' }}>
            <div className="blogtitle" data-testid="header">{blog.title} {blog.author} <button onClick={toggleOpen}>{ open ? 'close' : 'view' }</button></div>
            <div style={{ display: open ? '' : 'none' }}>
                <div>{blog.url}</div>
                <div>likes {counter} <button className="like" onClick={like}>like</button></div>
                <div>{user.name}</div>
                <div><button onClick={removeBlog}>remove</button></div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog