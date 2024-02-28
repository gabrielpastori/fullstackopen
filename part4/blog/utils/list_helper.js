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

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}