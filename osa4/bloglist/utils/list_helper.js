const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })
  return mostLiked
}

const mostBlogs = (blogs) => {
  let postsPerPerson = []
  blogs.map((blog) => {
    postsPerPerson[blog.author] = postsPerPerson[blog.author]
      ? postsPerPerson[blog.author] + 1
      : 1
  })
  console.log(postsPerPerson)
  let maxAuthor
  Object.keys(postsPerPerson).reduce(
    (prev, current) =>
      (maxAuthor =
        postsPerPerson[prev] > postsPerPerson[current] ? prev : current)
  )
  return { [maxAuthor]: postsPerPerson[maxAuthor] }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
