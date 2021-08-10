import axios from "axios"
const baseUrl = "/api/login"
import blogService from "./blogs"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  blogService.setToken(response.data.token)

  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(response))
  return response.data
}

export default { login }
