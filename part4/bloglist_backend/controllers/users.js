const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (req, res, next) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    if (!(username && password)) {
        return res.status(400).json({ error: 'Username and Password need to be given!' })
    }

    if ((username.length < 3 || password.length < 3)){
        return res.status(400).json({ error: 'Username and Password need to be at least three characters long!' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter
