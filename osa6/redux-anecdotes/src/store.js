import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import anecdoteReducer from "../src/reducers/anecdoteReducer"
import notificationReducer from "../src/reducers/notificationReducer"
import filterReducer from "../src/reducers/filterReducer"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
