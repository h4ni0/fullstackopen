const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes
    })
    return total
}

const mostLiked = (blogs) => {
    let mostLikes = -Infinity
    let mostLiked = {}
    blogs.forEach(blog => {
        if (blog.likes > mostLikes) {
            mostLiked = blog
            mostLikes = blog.likes
        }
    })
    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    mostLiked
}