const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')
// get requests

blogsRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id).then(foundBlog => {
        if (foundBlog) {
            res.json(foundBlog)
        } else {
            res.status(404).end()
        }
    }).catch(err => next(err))
})

// post reqest
blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({error: "invalid token"})
    }
    if (body.title && body.url && body.author) {
        const blog = new Blog({
            title: body.title,
            url: body.url,
            likes: body.likes || 0,
            author: body.author,
            user: decodedToken.id
        })
        const savedBlog = await blog.save()
        const user = await User.findOne({id: decodedToken.id})
        user.blogs = user.blogs.concat(blog._id)
        user.save()
        res.status(201).json(savedBlog)
    } else {
        res.status(400).end()
    }
})

// delete
blogsRouter.delete('/:id', userExtractor, async (req, res, next) => { // 403 => forbidden
    try {
        const blogToDelete = await Blog.findOne({_id: req.params.id})
        if (!req.user._id || req.user._id.toString() !== blogToDelete.user._id.toString()) {
            return res.status(403).json({error: "access denied"})
        }
        // const decodedToken = await jwt.verify(req.token, process.env.SECRET)
        await blogToDelete.delete()
        req.user.blogs = await req.user.blogs.filter(blog => blog.id.toString !== blogToDelete._id.toString())
        // if (!decodedToken.id || blog.user._id.toString() !== decodedToken.id) {
        //     return res.status(403).json({error: "access denied"})
        // }
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

// put
blogsRouter.put('/:id', (req, res, next) => {
    const body = req.body
    if (body.title && body.url && body.author) {
        const newBlog = {
            title: body.title,
            url: body.url,
            likes: body.likes || 0,
            author: body.author
        }
        Blog.findByIdAndUpdate(req.params.id, newBlog, {new: true}).then(updatedBlog => {
            res.status(200).json(updatedBlog)
        }).catch(err => next(err))
    }
})

module.exports = blogsRouter