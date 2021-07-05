import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [blogsVisible, setBlogsVisible] = useState(true)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    try {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      event.preventDefault()
      const user = await loginService.login({ username, password })

      setUser(user)
      setUsername("")
      setPassword("")
      setErrorMessage("logged in!")
    } catch (exception) {
      setErrorMessage("Wrong credentials")
    }

    console.log("logging in with", username, password)
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const handleSubmit = () => {
    try {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      blogService.create({
        title: title,
        author: author,
        url: url,
      })
      setErrorMessage("note added")
    } catch {}
    setErrorMessage("submit failed!")
  }

  const mainStyle = {
    margin: "5px",
    padding: "30px",
    width: "30vw",
    height: "10vw",
    border: "5px solid pink",
  }

  const loginForm = () => {
    return (
      <div style={mainStyle}>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              id="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" onClick={() => handleLogin()}>
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1> BlogList </h1>
      <Notification msg={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button type="button" onClick={() => handleLogOut()}>
            log out
          </button>
          <Togglable buttonLabel={"add a blog"}>
            <BlogForm
              blogsVisible={blogsVisible}
              setBlogsVisible={setBlogsVisible}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              handleSubmit={handleSubmit}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
