const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const init_db = require("../utils/init_db")
// const TokenExtractor = require("../utils/middlewares").TokenExtractor

blogsRouter.get("/all-blogs", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  res.status(200).json(blogs)
})

blogsRouter.get("/", async (req, res) => {
  const user = await User.findById(req.uid).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    // comments: 1
  })
  const blogs = user.blogs
  res.status(200).json(blogs)
})

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })

  if (blog) {
    res.status(200).json(blog)
  } else {
    res.status(404).json({ error: "not found" }).end()
  }
})

blogsRouter.get("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.status(200).json(blog.comments)
  }
})

// blogsRouter.delete("/:id", TokenExtractor, async (req, res) => {
blogsRouter.delete("/:id", async (req, res) => {
  const user = await User.findById(req.uid)
  await Blog.findByIdAndRemove(req.params.id)

  for (i = 0; i < user.blogs.length; i++) {
    if (user.blogs[i].toString() === req.params.id) {
      user.blogs.splice(i, 1)
    }
  }

  await user.save()
  res.status(204).end()
})

// blogsRouter.post("/", TokenExtractor, async (req, res) => {
blogsRouter.post("/", async (req, res) => {
  const body = req.body

  if (body === undefined) {
    return res.status(400).json({ error: "content missing" }) //400 bad request
  } else if (!(body.title && body.url)) {
    return res
      .status(400)
      .json({ error: "400 Bad Request: title or url missing" })
  }

  const user = await User.findById(req.uid)

  const blogTmp = new Blog({
    title: body.title === undefined ? "No title" : body.title,
    author: body.author === undefined ? "佚名" : body.author,
    url: body.url === undefined ? "www" : body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })

  const savedBlog = await blogTmp.save()
  user.blogs.push(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.post("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments.push(req.body.content)
  await blog.save()
  res.status(201).json(req.body.content)
})

// blogsRouter.put("/:id", TokenExtractor, async (req, res) => {
blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  )
  if (!updatedBlog) {
    return res.status(404).json({ error: "blog not found" })
  }
  res.status(200).json(updatedBlog)
})

blogsRouter.get("/init-blogs/2", async (req, res) => {
  await Blog.deleteMany({})

  const allUsers = await User.find({})
  for (let i = 0; i < init_db.initialBlogs.length; i++) {
    const rdN = Math.floor(Math.random() * allUsers.length)
    const blogData = init_db.initialBlogs[i]
    const newBlog = new Blog({
      title: blogData.title,
      author: blogData.author || "秩名",
      url: blogData.url || "www",
      likes: !blogData.likes ? 0 : blogData.likes,
      user: allUsers[rdN]._id,
    })
    const savedBlog = await newBlog.save()
    const user = await User.findById(allUsers[rdN].id)
    user.blogs.push(savedBlog._id)
    await user.save()
  }

  const allBlogs = await Blog.find({})
  return res.status(201).json(allBlogs)
})

module.exports = blogsRouter
