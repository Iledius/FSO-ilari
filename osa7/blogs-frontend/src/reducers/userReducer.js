const initialState = []

import loginService from "../services/login"
import { setNotification } from "./notificationReducer"

export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })

      dispatch({
        type: "LOG_IN",
        data: user,
      })

      dispatch(setNotification("Login successful!"))
    } catch {
      dispatch(setNotification("Login failed!"))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser")

    dispatch({
      type: "LOG_OUT",
    })
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.data

    case "LOG_OUT":
      return null

    default:
      return state
  }
}

export default userReducer
