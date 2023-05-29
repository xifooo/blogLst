const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const init_db = require("../utils/init_db")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { "username": 1, "name": 1, "id": 1 })
  res.json(blogs)
})


blogsRouter.get("/:id", async (req, res) => {
  const aBlog = await Blog.findById(req.params.id)
  if (aBlog) {
    res.json(aBlog)
  } else {
    res.status(404).end()
  }
})


blogsRouter.delete("/:id", async (req, res) => {
  const decodeToken = jwt.verify(getToken(req), process.env.SECRET)
  if (!decodeToken) {
    return res.status(401).json({ error: "token missing or invalid" })
  }
  
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})


blogsRouter.post("/", async (req, res) => {
  // const body = req.body;
  // const token = getToken(req)
  // const decodeToken = jwt.verify(token, process.env.SECRET)

  // if (!decodeToken) {
  //   res.status(401).json({ error: "token missing or invalid" })
  //   return res.status(304).redirect("/api/login")
  // } else if (body === undefined) {
  //   return res.status(400).json({ error: "content missing" }) //400 bad request
  // } else if (!(body.title && body.url)) {
  //   return res.status(400).json({ error: "400 Bad Request: title or url missing" })
  // }
  
  // const user = await User.findById(decodeToken.id)
  const body = req.body

  if (body === undefined) {
    return res.status(400).json({ error: "content missing" }) //400 bad request
  } else if (!(body.title && body.url)) {
    return res.status(400).json({ error: "400 Bad Request: title or url missing" })
  }

  const user = await User.findById(req.uid)

  const blogTmp = new Blog({
    title: body.title === undefined ? "No title" : body.title,
    author: body.author === undefined ? "佚名" : body.author,
    url: body.url === undefined ? "www" : body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blogTmp.save()
  user.blogs.push(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})


blogsRouter.put("/:id", async (req, res) => {
  const token = getToken(req)
  const decodeToken = jwt.verify(token, process.env.SECRET)
  if (!decodeToken) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  const { title, author, url, likes } = req.body
  const updatedBlog = await Blog
    .findByIdAndUpdate(
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
    const rdN = Math.floor(Math.random() * (allUsers.length))
    const blogData = init_db.initialBlogs[i]
    const newBlog = new Blog({
      title: blogData.title,
      author: blogData.author || "秩名",
      url: blogData.url || "www",
      likes: !blogData.likes ? 0 : blogData.likes,
      user: allUsers[rdN]._id
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