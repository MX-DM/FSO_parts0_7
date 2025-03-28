const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
    {
       title: "el blog de maxi",
       author: "maxi",
       url: "www.blogmaxi",
       likes: 69
    },
    {
       title: "audi cars",
       author: "audi",
       url: "www.audi.de.com",
       likes: 23
    },
    {
        title: "bmw is better than mercedes",
        author: "bmw",
        url: "www.xd",
        likes: 45 
     }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
   const users = await User.find({})
   return users.map(u => u.toJSON())
 }

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}
