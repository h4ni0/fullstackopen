import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('everything is defined', () => {

    test('<Blog /> displays the title and the author', () => {
        const blog = {
            title: 'a testing title',
            url: 'a-testing-url',
            author: 'a testing author',
            likes: 10
        }
        const user = {username: "h4ni0", name: "Hani"}

        render(<Blog blog={blog} user={user} />)
        const element = screen.getByTestId('header')
        expect(element).toBeDefined()
        expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
        expect(element).not.toHaveTextContent(`likes ${blog.likes}`)
    })

    test('shows url, likes, and user after clicking on the button', async () => { 
        const blog = {
            title: 'a testing title',
            url: 'a-testing-url',
            author: 'a testing author',
            likes: 10
        }
        const user = {username: "h4ni0", name: "Hani"}
        render(<Blog blog={blog} user={user} />)

        const clicker = userEvent.setup()
        const button = screen.getByText('view')


        await clicker.click(button)

        const url = screen.getByText(blog.url)
        const author = screen.getByText(`likes ${blog.likes}`)
        const userName = screen.getByText(user.name)
        expect(url).toBeDefined()
        expect(author).toBeDefined()
        expect(userName).toBeDefined()
    })

    test('like button works', async () => {
        const blog = {
            title: 'a testing title',
            url: 'a-testing-url',
            author: 'a testing author',
            likes: 10
        }
        const user = {username: "h4ni0", name: "Hani"}
        
        render(<Blog blog={blog} user={user} />)

        const clikcer = userEvent.setup()
        const viewButton = screen.getByText('view')
        const likeButton = screen.getByText('like')
        
    })
})