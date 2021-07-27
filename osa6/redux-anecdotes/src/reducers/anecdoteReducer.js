import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT",
      data: anecdotes,
    })
  }
}

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote)
    dispatch({
      type: "VOTE_ANECDOTE",
      data: anecdote,
    })
  }
}

export const sortByVotes = () => {
  return {
    type: "SORT",
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(asObject(content))
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.data

    case "ADD_ANECDOTE":
      return [...state, action.data]

    case "VOTE": {
      const id = action.data.id
      const votedAnecdote = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state.map((anec) => (anec.id !== id ? anec : changedAnecdote))
    }

    default:
      return state
  }
}

export default anecdoteReducer
