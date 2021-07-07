import React, { useState, useEffect, useRef } from "react"
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

  const blogFormRef = useRef()

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
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      blogService.setToken(user.token)

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

  const addBlog = () => {
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
      blogFormRef.current.toggleVisibility()
    } catch {
      setErrorMessage("submit failed!")
    }
  }

  return (
    <div>
      <h1> BlogList </h1>
      <Notification msg={errorMessage} />
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        ></LoginForm>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button type="button" onClick={() => handleLogOut()}>
            log out
          </button>
          <Togglable buttonLabel="add a blog" ref={blogFormRef}>
            <BlogForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              handleSubmit={addBlog}
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
