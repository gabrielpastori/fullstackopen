const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const authorUser = await User.findById(user.id)
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    'user': authorUser.id
  })
  authorUser.blogs = authorUser.blogs.concat(blog._id)
  authorUser.save()

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(204)
  if (user.id.toString() != blog.user.toString()) {
    return response.status(401).json({ error: 'You do not have permission to perform this action on this blog'})
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end();
})

blogRouter.patch('/:id', async (request, response, next) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(204)
  if (user.id.toString() != blog.user.toString()) {
    return response.status(401).json({ error: 'You do not have permission to perform this action on this blog'})
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })


  response.json(updatedBlog)
})
module.exports = blogRouter