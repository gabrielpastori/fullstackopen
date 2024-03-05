const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany()
        const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
        const blogPromises = blogObjects.map(blog => blog.save())
        await Promise.all(blogPromises)
    })

    test('Correct amount of posts and JSON format', async () => {
        const response = await api.get('/api/blogs')
                                .expect(200)
                                .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, helper.initialBlogs.length)

    })

    test('Verifies that the unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')
        const everyBlogHasId = response.body.every(blog => blog.hasOwnProperty('id'))
        assert.strictEqual(everyBlogHasId, true)
    })

    test('A valid blog can be added', async () => {
        const newBlog = {
            title: "High processing Computing",
            author: "Gabriel Pastori",
            url: "https://gabrielpastori.com/",
            likes: 7,
        }

        await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

        const addedBlog = response.body.find(blog => blog.url == newBlog.url)
        assert.strictEqual(addedBlog.title, newBlog.title)
        assert.strictEqual(addedBlog.author, newBlog.author)
        assert.strictEqual(addedBlog.url, newBlog.url)
        assert.strictEqual(addedBlog.likes, newBlog.likes)

    })
    describe('Addition of a new note', () => {
        test('A valid blog can be added', async () => {
            const newBlog = {
                title: "High processing Computing",
                author: "Gabriel Pastori",
                url: "https://gabrielpastori.com/",
                likes: 7,
            }

            await api.post('/api/blogs')
                    .send(newBlog)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

            const addedBlog = response.body.find(blog => blog.url == newBlog.url)
            assert.strictEqual(addedBlog.title, newBlog.title)
            assert.strictEqual(addedBlog.author, newBlog.author)
            assert.strictEqual(addedBlog.url, newBlog.url)
            assert.strictEqual(addedBlog.likes, newBlog.likes)

        })

        test('Check like property defaults to 0', async () => {
            const newBlogWithoutLikes = {
                title: "High processing Computing",
                author: "Gabriel Pastori",
                url: "https://gabrielpastori.com/",
            }

            await api.post('/api/blogs')
                    .send(newBlogWithoutLikes)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')

            const addedBlog = response.body.find(blog => blog.url == newBlogWithoutLikes.url)
            assert.strictEqual(addedBlog.likes, 0)
        })
    })
    describe('deletion of a note', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

            const urls = blogsAtEnd.map(blog => blog.url)
            assert(!urls.includes(blogToDelete.url))
        })
    })

    describe('update of a note', () => {
        test('succeeds updating number of likes for an id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            await api
                .patch(`/api/blogs/${blogToUpdate.id}`)
                .send({ 'likes': 25 })
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()

            const selectedBlogAfterUpdate = blogsAtEnd
                                                .filter(blog => blog.id === blogToUpdate.id)[0]
            assert.strictEqual(selectedBlogAfterUpdate.likes, 25)
        })
    })

})

after(async() => {
    await mongoose.connection.close()
})