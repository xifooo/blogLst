const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const init_db = require("../utils/init_db")


usersRouter.get("/", async (req, res) => {
  const users = await User
    .find({})
    .populate("blogs", { "title": 1, "url": 1, "likes": 1 })
  res.status(200).json(users)
})


usersRouter.get("/:id", async (req, res) => {
  const one = await User.findById({ "id": req.params.id })
  if (one) {
    res.status(200).json(one).end()
  } else {
    res.status(404).end()
  }
})


usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body

  if (username.length < 3 || password < 3) {
    return res.json({
      error: "username or name is too short, their length must be 3 at least"
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: "username must be unique"
    }).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})


usersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end()
})


usersRouter.put("/:id", async (req, res) => {
  const { username, name, password } = req.body
  const updatedUser = await User
    .findByIdAndUpdate(
      req.params.id,
      { username, name, password },
      { new: true, runValidators: true, context: "query" }
    )
})


usersRouter.get("/init-users/2", async (req, res) => {
  await User.deleteMany({})

  const newdata = init_db.initialUsers.map(async u => {
    const hashedId = await bcrypt.hash(u.password, 10)
    return {
      username: u.username,
      name: u.name,
      password: hashedId
    }
  })

  Promise.all(newdata)
    .then(async result => {
      const availibleData = result.map(({ username, name, password }) => ({ username, name, passwordHash: password }))
      await User.insertMany(availibleData)
      const usersInDb = await User.find({})
      res.status(201).json(usersInDb)
    })
})

module.exports = usersRouter