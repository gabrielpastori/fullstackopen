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


after(async() => {
    await mongoose.connection.close()
})