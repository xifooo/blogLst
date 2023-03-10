const express = require("express")
const app = express()

const cors = require("cors")

const blogRouter = require("./controllers/blogs_routers")
const middleware = require("./utils/middlewares")
const logger = require("./utils/logger")
const config = require("./utils/config")
const mongoose = require("mongoose")
const path = require("path")

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message)
  });

  
// loading middlewares
app.use(cors())
// app.use(express.static(path.join(".", "client", "build")))
app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app