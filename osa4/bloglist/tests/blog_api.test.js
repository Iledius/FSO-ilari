const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs returned", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("likes defaults to 0 if likes are not defined", async () => {
  const newBlog = new Blog({
    title: "test",
    author: "tester",
    url: "test.com",
  })
  await api.post("/api/blogs").send(newBlog)
  const response = await api.get("/api/blogs")
  expect(response.body[response.body.length - 1].likes).toEqual(0)
})

test("status 400 when title and url are missing from request", async () => {
  const newBlog = new Blog({
    author: "tester",
    likes: 0,
  })
  await api.post("/api/blogs").send(newBlog).expect(400)
})

test("a valid note can be added", async () => {
  const newBlog = new Blog({
    title: "test",
    author: "tester",
    url: "test.com",
    likes: 0,
  })

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const contents = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(newBlog.title)
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  mongoose.connection.close()
})
