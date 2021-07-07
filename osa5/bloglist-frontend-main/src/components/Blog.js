import React from "react"
import Togglable from "./Togglable"

const blogStyles = {
  margin: "5px",
  border: "1px solid black",
  padding: "10px",
}

const Blog = ({ blog, addLike, removePost }) => (
  <div style={blogStyles}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view">
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => addLike(blog._id)}>like</button>
      </div>
      <div>{blog.author}</div>
      <button onClick={() => removePost(blog._id, blog.title)}>remove</button>
    </Togglable>
  </div>
)

export default Blog
