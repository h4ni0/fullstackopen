const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.id)
    res.json(user)
})

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body
    const existingUser = await User.findOne({username})
    
    if (username && password && (username.length >= 3 && name.length >= 3) && existingUser === null) {
        const passwordHash = await bcrypt.hash(password, 10)
        const userObject = new User({
            username,
            name,
            passwordHash
        })
        const user = await userObject.save()
        res.json(user)
    } else {
        res.status(400).json({error: "invalid credential"})
    }
})


module.exports = usersRouter