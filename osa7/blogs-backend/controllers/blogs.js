const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

router.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: "only the creator can delete blogs" })
  }

  blog.delete()

  user.blogs = user.blogs.filter(
    (b) => b.id.toString() !== request.params.id.toString()
  )
  await user.save()
  response.status(204).end()
})

router.put("/:id", async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updatedBlog.toJSON())
})

router.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

router.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: "title or url missing " })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.post("/:id/comments", async (request, response) => {
  let blog = await Blog.findById(request.params.id)

  const comment = new Comment(request.body)

  if (!blog.comments) {
    blog.comments = []
  }
  blog.comments = blog.comments.concat(comment)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  await comment.save()

  response.json(updatedBlog.toJSON())
})

router.get("/:id/comments", async (request, response) => {
  let blog = await Blog.findById(request.params.id)

  let comments = await Promise.all(
    blog.comments.map((c) => Comment.findById(c))
  )

  response.json(comments)
})

module.exports = router
