const config = require("../utils/config")
const mongoose = require("mongoose")
const Blog = require("./blogs")

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongoDB')
    mongoose.set('strictQuery', false)
  })
  .catch(error => {
    console.log(error.message)
  })

Blog.find({})
.then(result => {
  result.forEach(item => {
    console.log(item)
  })
  mongoose.connection.close()
})