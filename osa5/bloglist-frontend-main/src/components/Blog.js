import React from "react"
import Togglable from "./Togglable"

const blogStyles = {
  margin: "5px",
  border: "1px solid black",
  padding: "10px",
}

const Blog = ({ blog }) => (
  <div style={blogStyles}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view">
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.author}</div>
    </Togglable>
  </div>
)

export default Blog
