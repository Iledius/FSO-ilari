const Blog = require("../models/blog")
const User = require("../models/user")

const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
]

const initialUsers = [
  {
    username: "morethanfive1",
    name: "Teemu Teekkari",
    password: "1234567",
  },
  {
    username: "morethanfive2",
    name: "Teemu Teekkari",
    password: "1234567",
  },
  {
    username: "morethanfive3",
    name: "Teemu Teekkari",
    password: "1234567",
  },
  {
    username: "morethanfive4",
    name: "Teemu Teekkari",
    password: "1234567",
  },
  {
    username: "morethanfive5",
    name: "Teemu Teekkari",
    password: "1234567",
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const login = async () => {
  const logInInfo = {
    username: initialUsers[0].username,
    password: initialUsers[0].password,
  }

  const result = await api
    .post("/api/login")
    .send(logInInfo)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  return result.body.token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
  login,
}
