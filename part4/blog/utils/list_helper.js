const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
     if (blogs.length === 0) return 0
    const mostFavoritedBlog = blogs.reduce((prev, curr) => (prev && prev.likes > curr.likes) ? prev : curr)
    const selectedBlog = {
        title: mostFavoritedBlog.title,
        author: mostFavoritedBlog.author,
        likes: mostFavoritedBlog.likes,
    }
    return selectedBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}
    const groupedByAuthor = _.groupBy(blogs, 'author')
    const authorBlogCounts = _.map(groupedByAuthor, (value, key) => ({
        author: key,
        blogs: value.length
    }))
    console.log(authorBlogCounts)
    const authorWithMostBlogs = _.maxBy(authorBlogCounts, 'blogs')
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    const groupedByAuthor = _.groupBy(blogs, 'author')
    const likesPerAuthor = _.mapValues(groupedByAuthor, (authorBlogs) =>
    _.sumBy(authorBlogs, 'likes'))

    const authorWithLikes = _.map(likesPerAuthor, (likes, author) => ({
        author,
        likes
    }))

    const authorWithMostLikes = _.maxBy(authorWithLikes, 'likes')

    return authorWithMostLikes
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}