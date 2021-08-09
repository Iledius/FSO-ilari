import React, { useState } from "react"

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    handleSubmit({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm
