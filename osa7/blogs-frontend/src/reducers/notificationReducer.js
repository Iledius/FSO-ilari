var timeoutID
const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.data

    case "RESET_NOTIF":
      return null

    default:
      return state
  }
}

export const setNotification = (content, type, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIF",
      data: {
        content: content,
        type: type,
      },
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({ type: "RESET_NOTIF" })
    }, time * 1000)
  }
}

export default notificationReducer
