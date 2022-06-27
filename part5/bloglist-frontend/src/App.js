import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Alert = ({ text, isError }) => {
    if (isError) {
        return <div className='error'>{text}</div>
    }
    return <div className='noti'>{text}</div>
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedUser')))
    const [alert, setAlert] = useState('')
    const [isError, setIsError] = useState(false)

    // sort blogs by likes
    const compare = (a, b) => b.likes - a.likes
    blogs.sort(compare)

    const sendNotification = (text, error) => {
        setIsError(error)
        setAlert(text)
        setTimeout(() => {
            setAlert('')
            setIsError(false)
        }, 5000)
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
        } catch (err) {
            sendNotification('wrong username or password', true)
        }
    }

    const loginForm = () => (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
          username <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
          password <input type="text" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button>login</button>
            </form>
        </div>
    )


    return (
        <div>
            <h1>blogs</h1>
            {alert ? <Alert text={alert} isError={isError} /> : ''}
            {user === null ?
                loginForm():
                <>
                    <div>
                        {user.name} logged in
                        <button onClick={() => {
                            window.localStorage.removeItem('loggedUser')
                            setUser(null)
                        }}>
               logout
                        </button>
                    </div>

                    <br />
                    <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} sendNotification={sendNotification} />
                    {blogs.map(blog =>
                        <Blog key={blog._id} blog={blog} user={user} />
                    )}

                </>
            }
        </div>
    )
}

export default App
