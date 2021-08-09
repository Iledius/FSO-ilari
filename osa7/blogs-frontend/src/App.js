import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { initBlogs, addBlog } from "./reducers/blogReducer"
import { setNotification } from "./reducers/notificationReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

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
      dispatch(setNotification(null))

      event.preventDefault()
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(setNotification("logged in"))
    } catch (exception) {
      dispatch(setNotification("Wrong credentials!"))
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const submitBlog = (blog) => {
    try {
      //dispatch(setNotification(null))
      dispatch(addBlog(blog))
      dispatch(setNotification("blog added"))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      dispatch(setNotification("Submit failed!"))
    }
  }

  const addLike = async (id) => {
    try {
      let blog = await blogService.getItem(id)
      blog.data.likes += 1
      blogService.update(id, blog.data)
    } catch (err) {
      dispatch(setNotification("Like failed!"))
    }
  }
  const removePost = async (id, title) => {
    try {
      if (window.confirm(`Remove blog: ${title}?`))
        await blogService.removeItem(id)
    } catch (err) {
      dispatch(setNotification("Remove failed!"))
    }
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1> BlogList </h1>
      <Notification />
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
            <BlogForm handleSubmit={submitBlog} />
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
