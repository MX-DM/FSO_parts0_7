const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  } 

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favourite = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  }, blogs[0])

  return favourite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}