import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { logIn } from "../reducers/userReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      dispatch(logIn(username, password))

      setUsername("")
      setPassword("")
      dispatch(setNotification("logged in"))
    } catch (exception) {
      dispatch(setNotification("Wrong credentials!"))
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
