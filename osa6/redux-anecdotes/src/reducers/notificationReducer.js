var timeoutID
export const setNotification = (notif, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notif,
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      })
    }, time * 1000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action

    case "CLEAR_NOTIFICATION":
      return null

    default:
      return state
  }
}

export default notificationReducer
