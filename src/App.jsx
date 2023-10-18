import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notiColor, setNotiColor] = useState('red')
  const [notiMessage, setNotiMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [blogs.entries])

  console.log('blogs:', blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      console.log(exception)
      setNotiMessage(exception.response.data.error)
      setNotiColor("red")
      setTimeout(() => {
        setNotiMessage('')

      }, 5000);
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addNewBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))

    blogFormRef.current.toggleVisibility()
    setNotiColor("green")
    setNotiMessage(
      `${blogObject.title} created!`
    )
    setTimeout(() => {
      setNotiMessage(``)
    }, 5000);
  }

  const incrementLikes = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
  }

  if (user === null) {
    return (
      <div>
        <Notification notiColor={notiColor} message={notiMessage} />
        <form onSubmit={handleLogin}>
          <div>Username:
            <input
              type="text"
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>Password:
            <input
              type="password"
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={handleLogOut}>log out</button>
        <Notification notiColor={notiColor} message={notiMessage} />
        <p>{user.name} logged in</p>
        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
          <BlogForm createBlog={addNewBlog} />
        </Togglable>
        <h2>blogs</h2>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikePost={() => incrementLikes(blog)} />
          )
        }
      </div >
    )
  }
}
export default App