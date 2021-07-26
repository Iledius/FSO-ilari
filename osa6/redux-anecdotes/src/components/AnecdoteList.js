import React from "react"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Filter from "../components/filter"
import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  console.log(filter)
  const filteredAnecdotes = anecdotes.filter((a) => a.content.includes(filter))
  anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  const vote = (id) => {
    console.log("vote", id)
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification("")), 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
