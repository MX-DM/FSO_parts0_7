const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    if (!blog) return res.status(404).json({ error: 'Blog not found' })
    res.json(blog)
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    blogToDelete = await Blog.findById(id)
    console.log('Blog to delete user ID:', blogToDelete.user.toJSON())
    console.log('DecodedToken Id:', decodedToken.id)
    if (!(decodedToken.id === blogToDelete.user.toJSON())) {
        return res.status(401).json({ error: 'unauthorized deletion' })
    }

    await Blog.findByIdAndDelete(id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
    res.status(204).json(updatedBlog).end()
})

module.exports = blogsRouter
