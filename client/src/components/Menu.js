import { useDispatch, useSelector } from "react-redux"
import { logoutFromAccount } from "../reducers/userReducer"
import { sendToMessage } from "../reducers/messageReducer"
import { useNavigate, Link } from "react-router-dom"

const Menu = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.user.currentUser)

  const naviage = useNavigate()

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogAppUser")
      dispatch(logoutFromAccount())
      dispatch(
        sendToMessage(`User: ${currentUser.username} exited successfully`, 5)
      )
      naviage("/login")
    } catch (exception) {
      dispatch(sendToMessage(`Some error occupying::: ${exception}`, 5))
    }
  }

  return (
    // <div className="w-full h-24 bg-blue-400 flex justify-start items-center gap-2">
    //   <p className="text-2xl font-bold text-white p-2">
    //     <span>
    //       <Link style={padding} to="/blogs">
    //         Blogs
    //       </Link>
    //     </span>
    //     &nbsp;
    //     <span>
    //       <Link style={padding} to="/users">
    //         Users
    //       </Link>
    //     </span>
    //     &nbsp;
    //     <span> welcome! {currentUser.username} logged in </span>
    //     <span>
    //       <button
    //         className="font-bold text-slate-700 border px-2 py-1 rounded"
    //         onClick={handleLogout}
    //       >
    //         Logout
    //       </button>
    //     </span>
    //   </p>
    // </div>
    <nav className="border-b-gray-200 border-b">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="ml-10 flex items-baseline gap-2">
            <Link
              to="/blogs"
              className="px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-200 focus:outline-none"
            >
              Blogs
            </Link>
            <Link
              to="/users"
              className="px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-200 focus:outline-none"
            >
              Users
            </Link>
          </div>
          <div className="mr-10 flex items-center gap-2">
            <p className="text-xl font-serif">welcome!{currentUser.username} logged in</p>
            <button
              className="bg-blue-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu
