import React from "react"

const BlogForm = ({
  blogsVisible,
  setBlogsVisible,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleSubmit,
}) => {
  if (!blogsVisible)
    return (
      <div>
        <button
          onClick={() => {
            setBlogsVisible(true)
          }}
        >
          create new blog
        </button>
      </div>
    )
  return (
    <div>
      <div>
        title:
        <input
          type="title"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="author"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  )
}

export default BlogForm
