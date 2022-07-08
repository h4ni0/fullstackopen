const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI =
    'mongodb+srv://h4ni:tsG!bbmVx5wKLJn@cluster0.il851.mongodb.net/library?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Author: {
        bookCount: async (root, args) => {
            const all = await Book.find({ name: root.name })
            return all.filter((book) => book.author === root.name).length
        },
    },
    Query: {
        bookCount: async () => Book.collection.coutDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const books = await Book.find({})
            return args.author && args.genre
                ? books
                      .filter((book) => book.author === args.author)
                      .filter((book) => book.genres.includes(args.genre))
                : args.author
                ? books.filter((book) => book.author === args.author)
                : args.genre
                ? books.filter((book) => book.genres.includes(args.genre))
                : books
        },
        allAuthors: async () => Author.find({}), // TODO me query
    },
    Mutation: {
        addBook: async (root, args) => {
            console.log('Adding new book')
            const isFound = await Author.exists({ name: args.author })
            if (!isFound) {
                const newAuthor = new Author({
                    name: args.author,
                })
                await newAuthor.save()
                console.log('created new autho')
            }
            const newBook = new Book({
                ...args,
            })
            newBook.save()
            return newBook
        },
        editAuthor: async (root, args) => {
            const author = Author.findOne({ name: args.name })
            if (!author) return null
            const updatedAuthor = await Author.findOneAndUpdate(
                { name: args.name },
                { born: Number(args.setBornTo) }
            )
            return { ...updatedAuthor, born: args.setBornTo }
        },
    }, // TODO login and createUser
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
// TODO 8.16 -> 8.x
