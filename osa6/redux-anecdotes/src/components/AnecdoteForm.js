import React from "react"
import { connect } from "react-redux"
import { addAnecdote } from "./../reducers/anecdoteReducer"
import { setNotification } from "./../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.addAnecdote(content)
    props.setNotification(`added: '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
