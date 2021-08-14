const initialState = []
import blogService from "../services/blogs"

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data

    case "ADD_BLOG":
      return [...state, action.data]

    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id)

    case "UPDATE_BLOG":
      return null

    case "LIKE_BLOG": {
      const newState = state
        .filter((blog) => blog.id !== action.data.id)
        .concat({ ...action.data, likes: action.data.likes + 1 })
      return newState
    }

    case "COMMENT_BLOG": {
      const newState = state
        .filter((blog) => blog.id !== action.data.id)
        .concat({ ...action.data, comments: action.data.comments })
      return newState
    }

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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: "LIKE_BLOG",
      data: {
        content: blog,
      },
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    // Updated blog is returned from backend.
    // We'll need to use this for the dispatch, so that the state is also updated
    const updatedBlog = blogService.addComment(blog, comment)

    dispatch({
      type: "COMMENT_BLOG",
      data: {
        content: updatedBlog,
      },
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    blogService.remove(blog.id)
    dispatch({
      type: "REMOVE_BLOG",
      data: {
        content: blog,
      },
    })
  }
}

export default blogReducer
