import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

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
      event.preventDefault()
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong credentials")

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      console.log("logging in with", username, password)
    }
  }

  const handleSubmit = () => {
    try {
      blogService.create({
        title: title,
        author: author,
        url: url,
      })
    } catch {}
    setErrorMessage()
  }

  const errStyle = {
    margin: "15px",
    border: "5px solid red",
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

  const blogForm = () => {
    return (
      <div>
        <div>
          <p1>title: </p1>
          <input
            type="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <p1>Author: </p1>
          <input
            type="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <p1>url: </p1>
          <input
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1> BlogList </h1>
      <div
        style={{
          ...errStyle,
          visibility: errorMessage ? "visible" : "hidden",
        }}
      >
        <h1>{errorMessage}</h1>
      </div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App
