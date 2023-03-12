const mongoose = require("mongoose");
const logger = require("../utils/logger")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// blogSchema.set("toJSON", {
//   transform: (document, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString()
//     delete returnedObj._id
//     delete returnedObj.__v
//   }
// })

const Blog = mongoose.model("blog", blogSchema)

MONGODB_URI="mongodb+srv://jyeho:123456123456@cluster0.30kp0cf.mongodb.net/blogLst?retryWrites=true&w=majority"

logger.info(`connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     logger.info("connected to MongoDB")
//   })
//   .catch((error) => {
//     logger.error("error connecting to MongoDB:", error.message)
//   });

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