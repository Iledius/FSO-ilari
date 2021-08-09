const initialState = []
import blogService from "../services/blogs"

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data

    case "ADD_BLOG":
      return [...state, action.data]

    case "REMOVE_BLOG":
      return null

    case "UPDATE_BLOG":
      return null

    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    })
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: "ADD_BLOG",
      data: newBlog,
    })
  }
}

export const updateBlog = (id, content) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_BLOG",
      data: {
        content: content,
      },
    })
  }
}

export default blogReducer
