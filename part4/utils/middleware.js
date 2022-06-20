const unknownEndPoint = (req, res) => {
    res.status(404).json({error: "unkown end point"})
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).json({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }
    
    next(error)
}

module.exports = {
    unknownEndPoint,
    errorHandler
}