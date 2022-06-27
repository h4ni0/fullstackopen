import { get } from "http"

describe('check everything is defined', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('login form exists', () => {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })
})

describe('login', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createNewUser()
        cy.visit('http://localhost:3000')
    })
    it('succeeds', () => {
        cy.get('input[name="username"]').type('h4ni0')
        cy.get('input[name="password"]').type('mypassword')
        cy.contains('login').click()
        cy.contains('logout')
    })
    it('fails', () => {
        cy.get('input[name="username"]').type('h4ni0')
        cy.get('input[name="password"]').type('WRONGPASSWORD')
        cy.contains('login').click()
        cy.contains('wrong username or password')
    })
})

describe('when logged in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('h4ni0')
        cy.get('input[name="password"]').type('mypassword')
        cy.contains('login').click()
    })
    it('creates a new blog', () => {
        cy.contains('new blog').click()
        cy.get('input[name=title]').type('a testing title')
        cy.get('input[name=url]').type('https://testing.com')
        cy.get('input[name=author]').type('testing author')
        cy.get('#submit').click()
    })
    it('likes a blog', () => {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('remove').click()
    })
    it('blogs are ordered by likes', () => {
        cy.contains('new blog').click()
        cy.get('input[name=title]').type('the most likes')
        cy.get('input[name=url]').type('https://testing.com')
        cy.get('input[name=author]').type('testing author')
        cy.get('#submit').click()

        cy.contains('view').click()
        cy.get('.like').eq(0).click()
        
        cy.contains('new blog').click()
        cy.get('input[name=title]').type('a testing title')
        cy.get('input[name=url]').type('https://testing.com')
        cy.get('input[name=author]').type('testing author')
        cy.get('#submit').click()
       
        cy.get('.like').eq(0).click()


        cy.get('.blogtitle').eq(0).should('contain', 'the most likes')
        cy.wait(500)
        cy.get('.blogtitle').eq(1).should('contain', 'a testing title')
    })
})