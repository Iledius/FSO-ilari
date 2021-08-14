import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
    "Content-Type": JSON,
  }
  const content = { content: comment }
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    content,
    config
  )
  return response.data
}

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const getItem = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request
}

const blogService = {
  getAll,
  setToken,
  create,
  update,
  getItem,
  remove,
  addComment,
  getComments,
}

export default blogService
