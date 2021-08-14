import React, { useEffect, useState } from "react"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { commentBlog, likeBlog, removeBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useParams } from "react-router-dom"

const BlogView = ({ blogs }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()
  let id = useParams().id

  useEffect(() => {
    blogService.getComments(id).then((comms) => setComments(comms))
  }, [])

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) return null

  const blogStyles = {
    margin: "5px",
    border: "1px solid black",
    padding: "10px",
  }

  const addLike = async () => {
    try {
      let blog = await blogService.getItem(id)
      dispatch(likeBlog(blog.data))
    } catch (err) {
      dispatch(setNotification("Like failed!")) // move to reducer
    }
  }

  const addComment = async (event) => {
    try {
      event.preventDefault()
      if (comment.length === 0) return null
      let blog = await blogService.getItem(id)

      dispatch(commentBlog(blog.data, comment))
    } catch (err) {
      dispatch(setNotification("comment failed!")) // move to reducer
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
    <div style={blogStyles} id="baseContainer">
      {blog.title}
      <div id="urlDiv">{blog.url}</div>
      <div id="likeDiv">
        likes {blog.likes}
        <button id="likeButton" onClick={() => addLike(blog.id)}>
          like
        </button>
      </div>
      <div style={{ padding: "5px" }}>
        <div>{blog.author}</div>
        <button id="removeButton" onClick={() => removePost(blog)}>
          remove
        </button>
      </div>
      <div
        id="formDiv"
        style={{ padding: "5px", borderTop: "1px solid black" }}
      >
        <form onSubmit={addComment}>
          <div id="commentDiv">
            Add comment:
            <input
              id="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
      <div style={{ paddingLeft: "5px", borderTop: "1px solid black" }}>
        <h4>comments:</h4>
        {comments.map((comment) => {
          if (!comment) return
          if (!comment.content) return // better logic here
          return (
            <div
              style={{ padding: "3px", border: "1px solid black" }}
              key={comment.id}
            >
              {" "}
              <ul>{`Anonymous: ${comment.content}`}</ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogView
