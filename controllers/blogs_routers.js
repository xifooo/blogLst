const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get("/", (req, res, next) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    });
})

blogRouter.get("/:id", (req, res, next) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error));
})

blogRouter.delete("/:id", (req, res, next) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error));
})

blogRouter.post("/", (req, res, next) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({error: "content missing"}) //400 bad request
  };

  const blogTmp = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 1
  });

  blogTmp
    .save()
    .then(result => {
      res.json(blogTmp)
    })
    .catch(error => next(error));
})

blogRouter.put("/:id", (req, res, next) => {
  const { title, author, url} = req.body

  Blog
    .findByIdAndUpdate(
      req.params.id,
      { title, author, url},
      { new: true, runValidators: true, context: "query"}
      )
    .then(updatedBlog => {
        res.json(updatedBlog)
      })
    .catch(error => next(error));
})

module.exports = blogRouter