import React from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, addLike, removePost }) => {
  const blogStyles = {
    margin: "5px",
    border: "1px solid black",
    padding: "10px",
  }

  return (
    <div style={blogStyles} id="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <div id="urlDiv">{blog.url}</div>
        <div id="likeDiv">
          likes {blog.likes}
          <button id="likeButton" onClick={() => addLike(blog._id)}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button
          id="removeButton"
          onClick={() => removePost(blog._id, blog.title)}
        >
          remove
        </button>
      </Togglable>
    </div>
  )
}

export default Blog
