export const setNotification = (notif) => {
  return {
    type: "SETNOTIFICATION",
    data: notif,
  }
}

const notificationReducer = (state = "", action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch (action.type) {
    case "SETNOTIFICATION": {
      return action.data
    }
    default:
      return state
  }
}

export default notificationReducer
