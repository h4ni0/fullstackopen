const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../../../node/app')
const app = require('../index')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

describe('when there are some blogs', () => {
    test('blogs returned as JSON', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        const blogs = await helper.allBlogsInDb()
    })

    test('returned the right amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.blogs.length)
    })

    test('blog craeted successfully', async () => {
        const blogObj = {
            title: "a testing title",
            url: "a-testing-url",
            like: 101,
            author: "testing author"
        }
        await api.post('/api/blogs').send(blogObj).expect(201)
        const finalBlogStatus = await helper.allBlogsInDb()
        expect(finalBlogStatus.length).toBe(helper.blogs.length + 1)
        expect(finalBlogStatus.map(blog => blog.title)).toContain(blogObj.title)
    } )
})

describe('when veiwing a specific blog', () => {
    test('suceeds', async () => {
        const blogsAtFirst = await helper.allBlogsInDb()
        const id = blogsAtFirst[0]._id
        const resultBlog = await api.get(`/api/blogs/${id}`).expect(200).expect('Content-Type', /application\/json/)
        expect(resultBlog.body).toEqual(helper.blogs[0])
    })

    test('fails with the code 404 if the blog desn\'t exists', async () => {
        const validNonExistingId = await helper.nonExistingId()
        await api.get(`/api/blogs/${validNonExistingId}`).expect(404)
    })

    test('fails with the code 400 if provided a non-valid id', async () => {
        const nonValidId = 'asdlfja2t23lj52'
        await api.get(`/api/blogs/${nonValidId}`).expect(400)
    })
})

test('delete a blog', async () => {
    const initialBlogs = await helper.allBlogsInDb()
    const id = await initialBlogs[0]._id.toString()
    await api.delete(`/api/blogs/${id}`).expect(204)
    const afterDeletionBlogs = await helper.allBlogsInDb()
    expect(afterDeletionBlogs).toHaveLength(initialBlogs.length - 1)
})

test('updating an existin post', async () => {
    const initialBlogs = await helper.allBlogsInDb()
    const id = initialBlogs[0]._id
    let blogObj = {
        ...initialBlogs[0],
        likes: 99
    }
    const response = await api.put(`/api/blogs/${id}`).send(blogObj).expect(200)
    expect(response.body).toMatchObject({likes: 99})
})

afterAll(() => {
    mongoose.connection.close()
})