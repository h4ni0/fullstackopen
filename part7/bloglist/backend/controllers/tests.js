const testsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

testsRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
})

module.exports = testsRouter