const mongoose = require("mongoose")
const logger = require("../utils/logger")
const password = process.argv[2];
const url = `mongodb+srv://jyeho:${password}@cluster0.30kp0cf.mongodb.net/blogLst?retryWrites=true&w=majority`;

logger.info(`connecting to ${url}`)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  });


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
  },
  likes: {
    type: Number,
  }
})
blogSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})
const Blog = mongoose.model("blog", blogSchema)


let oneBlog = new Blog ({
  title: "First Blog",
  author: "author",
  url: "qweqweqweqweqwe.com",
  likes: 10
})

oneBlog.save().then(result => {
  console.log('one blog saved')
})
Blog.find({}).then(result => console.log(result))

let blogs = [
  {
    title: "HTML is easyyyyyyyy",
    author: "jyeeho",
    url: "https://baidu.com",
    likes: 1
  },
  {
    title: "Browser can execute only Javascript",
    author: "jyeeho",
    url: "https://baidu.com",
    likes: 13
  },
  {
    title: "GET and POST are the most important methods of HTTP protocol",
    author: "xifoo",
    url: "https://baidu.com",
    likes: 5
  }
]

Blog.insertMany(blogs)

Blog
  .find({})
  .then(result => {
    result.forEach(item => {
      console.log(item)
    })
    mongoose.connection.close()
  })