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
import store from "../store"

const LoginForm = () => {
  const uname = useField("text")
  const passwd = useField("text")

  const dispatch = useDispatch()

  const userState = useSelector((state) => state.user.currentUser)

  // useEffect(() => {
  //   try {
  //     if (!userState) {
  //       const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
  //       console.log(`loggedUserJSON: ${loggedUserJSON}`)
  //       if (loggedUserJSON) {
  //         const userLocal = JSON.parse(loggedUserJSON)
  //         if (userLocal) {
  //           const jwt = userLocal.tokenExpiresIn
  //           console.log(`jwt: ${jwt}`)
  //           if (jwt && jwt > new Date()) {
  //             window.localStorage.removeItem("loggedBlogAppUser")
  //             dispatch(logoutFromAccount())
  //           } else {
  //             dispatch(setLocalAccount(userLocal))
  //           }
  //         }
  //       } else if (loggedUserJSON === null) {
  //         window.localStorage.removeItem("loggedBlogAppUser")
  //       }
  //     }
  //   } catch (exception) {
  //     dispatch(sendToMessage(`Some error occupyed:::${exception}`, 9))
  //   }
  // }, [userState])
  useEffect(() => {
    checkLocalStorage()
  }, [userState])

  useEffect(() => {
    storeUserInfo()
  }, [userState])

  const checkLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    console.log(`loggedUserJSON: ${loggedUserJSON}`)
    if (loggedUserJSON) {
      const userLocal = JSON.parse(loggedUserJSON)
      if (userLocal) {
        const jwt = userLocal.tokenExpiresIn
        if (jwt && jwt > new Date()) {
          dispatch(setLocalAccount(userLocal))
        } else {
          window.localStorage.removeItem("loggedBlogAppUser")
          dispatch(logoutFromAccount())
        }
      }
    } else {
      window.localStorage.removeItem("loggedBlogAppUser")
    }
  }
  const storeUserInfo = () => {
    if (userState) {
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userState)
      )
    }
  }
  const navigate = useNavigate()
  const handleLogin = (e) => {
    try {
      e.preventDefault()
      if (!uname || !passwd) {
        dispatch(sendToMessage("username or password is error", 5))
      }
      dispatch(
        loginToAccount({ username: uname.value, password: passwd.value })
      ).then(() => {
        const uState = store.getState().user.currentUser
        console.log(`uState:${JSON.stringify(uState)}`)
        console.log(`userState:${JSON.stringify(userState)}`)
        // window.localStorage.setItem(
        //   "loggedBlogAppUser",
        //   JSON.stringify(userState)
        // )
        navigate("/blogs")
        dispatch(sendToMessage(`welcome to blog app! ${uname.value}`, 5))
      })
    } catch (exception) {
      dispatch(
        sendToMessage(`Some error happening when login::: ${exception}`, 5)
      )
    }
  }
  return (
    // <form
    //   onSubmit={handleLogin}
    //   className="w-full mt-40 flex justify-center items-center gap-2"
    // >
    //   <p>
    //     username:
    //     <input {...uname} className="px-2 border rounded-md" />
    //   </p>
    //   <p>
    //     password:
    //     <input {...passwd} className="px-2 border rounded-md" />
    //   </p>
    //   <br />
    //   <button
    //     type="submit"
    //     className="px-6 py-2 rounded font-bold text-white bg-slate-700"
    //   >
    //     Login
    //   </button>
    // </form>
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-xl">
            Username
          </label>
          <input
            {...uname}
            className="shadow appearance-none border text-gray-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-xl">
            Password
          </label>
          <input
            {...passwd}
            className="shadow appearance-none border text-gray-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
