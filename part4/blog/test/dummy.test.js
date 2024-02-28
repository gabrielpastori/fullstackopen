const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  const noBlogs = []
  const oneBlogs = [
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
  ]

  const twoBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
  ]
  test('when list has no blogs, equals to zero', () => {
    assert.strictEqual(listHelper.totalLikes(noBlogs), 0)
  })
  test('when list has one blog, equals the number of likes', () => {
    assert.strictEqual(listHelper.totalLikes(oneBlogs), 12)
  })

  test('when list has two blogs, equals the sum of both', () => {
    assert.strictEqual(listHelper.totalLikes(twoBlogs), 12)
  })
})

describe('favoriteBlog', () => {
  const noBlogs = []
  const oneBlogs = [
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
  ]

  const twoBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
  ]
  
  test('when list has no blog, equals to zero', () => {
    assert.strictEqual(listHelper.favoriteBlog(noBlogs), 0)
  })

  test('when list has one blogs, equals the object with keys title, author and likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(oneBlogs), 
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
    )
  })

  test('when list has two blogs, equals the object with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(twoBlogs), 
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    }
    )
  })



})