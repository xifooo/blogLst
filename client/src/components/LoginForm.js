import useField from "../hooks/useField"
import { useDispatch } from "react-redux"

import { loginToAccount } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { sendToMessage } from "../reducers/messageReducer"

const LoginForm = () => {
  const uname = useField("text")
  const passwd = useField("text")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = (e) => {
    try {
      e.preventDefault()
      if (uname && passwd) {
        dispatch(sendToMessage("username or password is false", 5))
      }

      dispatch(
        loginToAccount({ username: uname.value, password: passwd.value })
      )
      // console.log(`current user state: ${currentUser}`)
      navigate("/blogs")
      dispatch(sendToMessage(`welcome to blog app! ${uname.value}`, 5))
    } catch (exception) {
      dispatch(
        sendToMessage(`Some error happening when login::: ${exception}`, 5)
      )
    }
  }

  return (
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
