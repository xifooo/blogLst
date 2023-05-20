const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blogs")
const helper = require("./test_helper")

beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 10000)


describe("blogs list tests", () => {
  test("blogs are returned as json", async() => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect("content-type", /application\/json/)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("unique sign are defined to id", async() => {
    const res = await api.get("/api/blogs")
    expect(res.body[1]["id"]).toBeDefined()
  })

  test("POST a new blog, then checking that blogs' amount will have added 1 ", async() => {
    const res1 = await api.get("/api/blogs")
    const oldLen = res1.body.length

    const newBlog = {
        "author": "Prince",
        "title": "I wanna be your lover",
        "likes": 30,
        "url": "3r.cx"
      }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)

    const res2 = await api.get("/api/blogs")
    const newLen = res2.body.length
    expect(oldLen+1).toBe(newLen)
  }, 10000)
  
  test("checking that the default value of a blog's 'likes' attribute equal 0", async() => {
    await api
      .post("/api/blogs")
      .send({
        "author": "booter",
        "title": "Freakin you",
        "url": "3333.com.cn"
      })
      .expect(201)

    const res = await Blog
      .find({"title": "Freakin you"})
      
    expect(res.length).toBe(1)
    expect(res[0]["likes"]).toBe(0)
  }, 10000)
  
  test("return 400 Bad Request if POST a blog without two attrs:title、url", async() => {
    await api
      .post("/api/blogs", {
        "author": "Bovid"
        // "title": "Under pressure",
        // "url": "and Queen"
      })
      .expect(400)
  }, 10000)
})


afterAll(() => {
  mongoose.connection.close()
})