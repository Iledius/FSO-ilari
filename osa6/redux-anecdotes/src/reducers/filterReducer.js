export const setFilter = (filter) => {
  return {
    type: "SETFILTER",
    data: filter,
  }
}

const filterReducer = (state = "", action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch (action.type) {
    case "SETFILTER": {
      return action.data
    }
    default:
      return state
  }
}

export default filterReducer
