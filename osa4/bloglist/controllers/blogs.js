const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => console.error(error))
})

blogsRouter.post("/", async (request, response) => {
  const b = request.body._doc
  if (!b.title && !b.url) {
    response.send(400).end()
  }

  const blog = new Blog({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes || 0,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
