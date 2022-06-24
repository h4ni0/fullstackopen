const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    const foundUser = await User.findOne({username})
    const passwordVerify = foundUser === null ? false : bcrypt.compare(password, foundUser.passwordHash)
    if(foundUser && passwordVerify) {
        const userForToken = {
            username,
            id: foundUser._id
        }
        const token = await jwt.sign(userForToken, process.env.SECRET)
        res.json({username, name: foundUser.name, token})
    } else {
        res.status(400).json({error: "invalid username and password"})
    }
})

module.exports = loginRouter