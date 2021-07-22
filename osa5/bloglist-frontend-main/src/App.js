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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((b1, b2) => {
          return b2.likes - b1.likes
        })
      )
    )
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
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
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

  const addBlog = (blog) => {
    try {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      blogService.create(blog)
      setErrorMessage("blog added")
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setErrorMessage("submit failed!")
    }
  }

  const addLike = async (id) => {
    try {
      let blog = await blogService.getItem(id)
      blog.data.likes += 1
      blogService.update(id, blog.data)
    } catch (err) {
      setErrorMessage("like failed!")
    }
  }
  const removePost = async (id, title) => {
    try {
      if (window.confirm(`Remove blog: ${title}?`))
        await blogService.removeItem(id)
    } catch (err) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setErrorMessage("remove failed!")
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
          <button
            id="logout-button"
            type="button"
            onClick={() => handleLogOut()}
          >
            log out
          </button>
          <Togglable buttonLabel="add a blog" ref={blogFormRef}>
            <BlogForm handleSubmit={addBlog} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              removePost={removePost}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
