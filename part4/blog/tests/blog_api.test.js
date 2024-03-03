const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

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

after(async() => {
    await mongoose.connection.close()
})