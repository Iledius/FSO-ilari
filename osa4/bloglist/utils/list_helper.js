const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
  return sum
}

module.exports = {
  dummy,
  totalLikes,
}
