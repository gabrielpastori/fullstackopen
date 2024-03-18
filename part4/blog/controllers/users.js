const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (password.length < 3) {
        return response.status(400).json({ error: 'User validation failed: password: password must be at least 3 chars length' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })

    const newUser = await user.save()
    response.status(201).json(newUser)
})

userRouter.get('/', async (request, response) => {
    const listOfUsers = await User.find({}).populate('blogs')

    response.status(200).json(listOfUsers)
})


module.exports = userRouter