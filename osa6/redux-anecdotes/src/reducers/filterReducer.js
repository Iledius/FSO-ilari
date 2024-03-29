export const setFilter = (filter) => {
  return {
    type: "SETFILTER",
    data: filter,
  }
}

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SETFILTER": {
      return action.data
    }
    default:
      return state
  }
}

export default filterReducer
