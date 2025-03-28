const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { applyTimestamps } = require('./models/blogs')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to DB with: ', mongoUrl)
    })
    .catch(() => {
        console.log('Error connecting to DB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.getToken)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
