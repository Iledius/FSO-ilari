import React from "react"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const blogStyles = {
    margin: "5px",
    border: "1px solid black",
    padding: "10px",
  }

  return (
    <div style={blogStyles} key={blog.id}>
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
  )
}

export default Blog
