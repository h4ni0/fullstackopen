const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    published: String,
    author: String,
    genres: [{ type: String }],
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
