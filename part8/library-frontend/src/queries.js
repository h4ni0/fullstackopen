import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query all_authors {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooksQuery($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            id
            title
            published
            author
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation (
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            id
            title
            published
            author
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            id
            name
            born
        }
    }
`
