import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (anecdote) => {
  const updatedObject = {
    id: anecdote.id,
    content: anecdote.content,
    votes: anecdote.votes + 1,
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedObject)
  return response.data
}

const anecdoteService = {
  getAll,
  create,
  update,
}
export default anecdoteService
