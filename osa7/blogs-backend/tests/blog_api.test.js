const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)
  let userObj = new User({
    username: helper.initialUsers[0].username,
    passwordHash: passwordHash,
  })
  await userObj.save()

  const token = await helper.login()
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  let blogObject = new Blog(helper.initialBlogs[0])
  blogObject.user = user.blogs.concat(user._id)
  await blogObject.save()
})

describe("getting blogs ", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs returned", async () => {
    const response = await helper.blogsInDb()

    expect(response).toHaveLength(1)
  })
})

describe("adding blogs", () => {
  test("likes defaults to 0 if likes are not defined", async () => {
    const token = await helper.login()
    const newBlog = new Blog({
      title: "test",
      author: "tester",
      url: "test.com",
    })
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const response = await helper.blogsInDb()
    expect(response[response.length - 1].likes).toEqual(0)
  })

  test("status 400 when title and url are missing from request", async () => {
    const token = await helper.login()
    const newBlog = new Blog({
      author: "tester",
      likes: 0,
    })
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test("a valid blog can be added", async () => {
    const token = await helper.login()
    const newBlog = new Blog({
      title: "test",
      author: "tester",
      url: "test.com",
      likes: 0,
    })

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const response = await helper.blogsInDb()

    const contents = response.map((r) => r.title)

    expect(contents).toContain(newBlog.title)
  })
})

describe("updating blogs", () => {
  test("updating a blog with valid id", async () => {
    const token = await helper.login()
    const allBlogs = await helper.blogsInDb()
    const blog = new Blog({
      title: "updated",
      author: "updated",
      url: "test.com",
      likes: 123,
    })
    await api
      .put(`/api/blogs/:${allBlogs[0].id}`)
      .set("Authorization", `bearer ${token}`)
      .send(blog)
      .expect(400)
  })
  test("adding one like", async () => {
    const token = await helper.login()
    const allBlogs = await helper.blogsInDb()
    console.log(allBlogs)
    let blog = allBlogs[0]
    blog.likes += 1
    await api
      .put(`/api/blogs/:${blog.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(blog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
