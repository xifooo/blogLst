const loginRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password"
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 } // 1 hours
  )
  res.setHeader(
    "expiresIn", new Date(new Date().getTime() + 80 * 60 * 1000).toUTCString()
  )
  res.status(200).send({
    token,
    username: username,
    name: user.name,
    id: user._id
  })
})

module.exports = loginRouter