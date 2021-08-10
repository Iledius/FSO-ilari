import React from "react"
import Togglable from "./Togglable"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyles = {
    margin: "5px",
    border: "1px solid black",
    padding: "10px",
  }

  const addLike = async (id) => {
    try {
      let blog = await blogService.getItem(id)
      dispatch(likeBlog(blog.data))
    } catch (err) {
      dispatch(setNotification("Like failed!")) // move to reducer
    }
  }

  const removePost = async (blog) => {
    try {
      if (window.confirm(`Remove blog: ${blog.title}?`)) {
        dispatch(removeBlog(blog))
      }
    } catch (err) {
      dispatch(setNotification("Remove failed!"))
    }
  }

  return (
    <div style={blogStyles} id="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <div id="urlDiv">{blog.url}</div>
        <div id="likeDiv">
          likes {blog.likes}
          <button id="likeButton" onClick={() => addLike(blog.id)}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button id="removeButton" onClick={() => removePost(blog)}>
          remove
        </button>
      </Togglable>
    </div>
  )
}

export default Blog
