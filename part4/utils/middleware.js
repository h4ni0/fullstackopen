const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (decodedToken.id) {
            req.user = await User.findOne({_id: decodedToken.id})
        }
        next()
    } catch(error) {
        next(error)
    }
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).json({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({error: "invalid token"})
    }
    
    next(error)
}

const unknownEndPoint = (req, res) => {
    res.status(404).json({error: "unkown end point"})
}

module.exports = {
    unknownEndPoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}