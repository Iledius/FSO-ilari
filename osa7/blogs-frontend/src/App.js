import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { initBlogs, addBlog } from "./reducers/blogReducer"
import { setNotification } from "./reducers/notificationReducer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserView from "./components/UserView"
import userService from "./services/users"
import UsersList from "./components/UsersList"

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.data.token)
    }
  }, [])

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

  const BlogView = () => {
    return <div></div>
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1> BlogList </h1>
      <Notification />
      <Router>
        <Switch>
          <Route path="/blogs/:id">
            <BlogView blogs={blogs} user={user} />
          </Route>
          <Route path="/users">
            <UsersList users={users} />
          </Route>
          <Route path="/user/:id">
            <UserView users={users} />
          </Route>
          <Route path="/">
            {user === null ? (
              <LoginForm></LoginForm>
            ) : (
              <div>
                <p>{user.data.name} logged-in</p>
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
                  <Blog key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
