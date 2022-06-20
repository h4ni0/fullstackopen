const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// get requests
blogsRouter.get('/', (req, res, next) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    }).catch(err => next(err))
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
blogsRouter.post('/', (req, res, next) => {
    const body = req.body
    if (body.title && body.url && body.author) {
        const blog = new Blog({
            title: body.title,
            url: body.url,
            likes: body.likes || 0,
            author: body.author
        })

        blog.save().then(savedBlog => {
            logger.info("Blog Saved!")
            res.status(201).json(savedBlog)
        }).catch(err => next(err))
    } else {
        res.status(400).end()
    }
})

// delete
blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end()
    }).catch(err => next(err))
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