const m = require("mongoose")

const blogSchema = new m.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = m.model("Blog", blogSchema)