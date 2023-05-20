const Blog = require("../models/blogs")

const initialBlogs = [
  {
    "title": "First Blog",
    "author": "author",
    "url": "https://gitigiti.com",
    "likes": 19
  },
  {
    "title": "Browser can execute only Javascript",
    "author": "jyeeho",
    "url": "https://baidu.com",
    "likes": 2,
  },
  {
    "title": "GET and POST are the most important methods of HTTP protocol",
    "author": "xifoo",
    "url": "https://qweqwe.com",
    "likes": 20
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    "title": "GET and POST are the most important methods of HTTP protocol",
    "author": "xifoo",
    "url": "https://qweqwe.com",
    "likes": 20
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(item => item.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb
}