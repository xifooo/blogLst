const blogRouter = require('express').Router()
const Blog = require('../models/blogs')


blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})


blogRouter.get("/:id", async (req, res) => {
  const aBlog = await Blog.findById(req.params.id)
  if (aBlog) {
    res.json(aBlog)
  } else {
    res.status(404).end()
  }
})


blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})


blogRouter.post("/", async (req, res) => {
  const body = req.body;
  
  if (body === undefined) {
    return res.status(400).json({ error: "content missing"}) //400 bad request
  } else if (!(body.title && body.url)) {
    return res.status(400).json({ error: "400 Bad Request: title or url missing"})
  } 
  const blogTmp = new Blog({
    title: body.title,
    author: body.author || "佚名",
    url: body.url,
    // likes: body.likes || 0
    likes: !body.likes ? 0 : body.likes
  });
  const savedBlog = await blogTmp.save()
  res.status(201).json(savedBlog)

  // else if (body.hasOwnProperty("title") && body.hasOwnProperty("url")) {
  // // if (body["title"] && body["url"]) {
  //   const blogTmp = new Blog({
  //     title: body.title,
  //     author: body.author || "佚名",
  //     url: body.url,
  //     likes: body.likes || 0
  //   });
  //   const savedBlog = await blogTmp.save()
  //   res.status(201).json(savedBlog)
  // } 
  // else {
  //   res.status(400).json({error: "400 Bad Request: title or url missing"})
  // }
})


blogRouter.put("/:id", async (req, res) => {
  const { title, author, url} = req.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      req.params.id,
      { title, author, url},
      { new: true, runValidators: true, context: "query"}
      )
  res.json(updatedBlog)
})


module.exports = blogRouter