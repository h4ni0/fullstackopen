const {PORT, MONGODB_URI} = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter =  require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')


mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app

// 4.6 4.7 4.9 4.11 4.12 undone