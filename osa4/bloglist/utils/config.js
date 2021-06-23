require("dotenv").config()

const PORT = process.env.PORT
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://fso:fullstack@fsocluster.ntkwi.mongodb.net/blogs?retryWrites=true&w=majority"

module.exports = {
  MONGODB_URI,
  PORT,
}
