import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import blogReducer from "../src/reducers/blogReducer"
import notificationReducer from "../src/reducers/notificationReducer"
import userReducer from "../src/reducers/userReducer"

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  users: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
