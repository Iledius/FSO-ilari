import React from "react"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Filter from "./Filter"
import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector((state) => state.filter)

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((a) => a.content.includes(filter))
  )

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted ${anecdote.content}`), 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.sort((a, b) => b.votes - a.votes) &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
