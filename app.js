const config = require("./utils/config")
const express = require("express")
const app = express()

const cors = require("cors")

const testingRouter = require("./controllers/testing_routers")
const loginRouter = require("./controllers/login_routers")
const usersRouter = require("./controllers/users_routers")
const blogsRouter = require("./controllers/blogs_routers")
const middleware = require("./utils/middlewares")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
// const path = require("path")

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("connected to MongoDB")
    mongoose.set('strictQuery', false)
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message)
  });

  
// loading middlewares
app.use(cors())
// app.use(express.static(path.join(".", "client", "build")))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/login", loginRouter)
app.use("/api/tests", testingRouter)
// app.use(middleware.TokenExtractor)
app.use("/api/blogs", middleware.TokenExtractor, blogsRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app