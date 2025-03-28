const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blogs')

describe('With blogs in the DB', () => {
    beforeEach( async () => {
        await Blog.deleteMany()
        await Blog.insertMany(helper.initialBlogs)
    })

    test('Blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All blogs are returned', async () => {
        const res = await api.get('/api/blogs')

        assert.strictEqual(res.body.length, helper.initialBlogs.length)
    })

    describe('Viewing and specific blog', () => {
        test('Succeeds with correct id property name', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const exampleBlog = blogsAtStart[0]
            assert.strictEqual('id' in exampleBlog, true)
        })
    })

    describe('Addition of a new Blog', () => {
        test('Succeeds with valid data', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const newBlog = {
                title: "test blog",
                author: "test",
                url: "www.test",
                likes: 1
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length )

            const contents = blogsAtEnd.map(b => b.title)
            assert(contents.includes('test blog'))
        })

        test('Missing likes property is 0', async () => {
            const newBlog = {
                title: "test blog",
                author: "test",
                url: "www.test"
            }

            const resultBlog = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            assert.strictEqual(resultBlog.body.likes, 0)
        })

        test('400 status code with missing author or url', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const newBlogNoTitle = {
                url: "www.test"
            }
            const newBlogNoUrl = {
                title: "test title"
            }

            await api
                .post('/api/blogs')
                .send(newBlogNoTitle)
                .expect(400)

            await api
                .post('/api/blogs')
                .send(newBlogNoUrl)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
        })
    })

    describe('Deletion of a blog', () => {
        test('Succeeds with code 204 with valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

            const contents = blogsAtEnd.map(b => b.title)
            assert(!contents.includes(blogToDelete.title))
        })
    })

    describe('Updation of a blog', () => {
        test('Succeeds with code 204 with valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const blog = {
                title: blogToUpdate.title,
                author: blogToUpdate.author,
                url: blogToUpdate.url,
                likes: 999
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blog)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()
            const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

            assert.strictEqual(updatedBlog.likes, 999)
        })
    })
})




after(async () => {
    mongoose.connection.close()
})