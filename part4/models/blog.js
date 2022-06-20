const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    url: {
        type: String,
        minlength: 5,
        required: true
    },
    likes: {
        type: Number,
        required: false
    },
    author: {
        type: String,
        minlength: 5,
        required: true
    }
})

module.exports = mongoose.model('Blog', blogSchema)