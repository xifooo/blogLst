import useField from "../hooks/useField"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import {
  loginToAccount,
  logoutFromAccount,
  setLocalAccount,
} from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { sendToMessage } from "../reducers/messageReducer"

const LoginForm = () => {
  const uname = useField("text")
  const passwd = useField("text")

  const dispatch = useDispatch()

  const userState = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      if (!userState) {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        console.log(`loggedUserJSON: ${loggedUserJSON}`)
        if (loggedUserJSON !== null || loggedUserJSON !== undefined) {
          const userLocal = JSON.parse(loggedUserJSON)
          if (userLocal) {
            const jwt = userLocal.tokenExpiresIn
            console.log(`jwt: ${jwt}`)
            if (jwt && jwt > new Date()) {
              window.localStorage.removeItem("loggedBlogAppUser")
              dispatch(logoutFromAccount())
            } else {
              dispatch(setLocalAccount(userLocal))
            }
          }
        }
      }
    } catch (exception) {
      dispatch(sendToMessage(`Some error occupyed:::${exception}`, 9))
    }
  }, [])

  const handleLogin = (e) => {
    try {
      e.preventDefault()
      dispatch(
        loginToAccount({ username: uname.value, password: passwd.value })
      )
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userState)
      )
      navigate("/blogs")
      dispatch(sendToMessage(`welcome to blog app! ${uname.value}`, 5))
    } catch (exception) {
      dispatch(
        sendToMessage(`Some error happening when login::: ${exception}`, 5)
      )
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <p>
        username:
        <input {...uname} />
      </p>
      <p>
        password:
        <input {...passwd} />
      </p>
      <br />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm