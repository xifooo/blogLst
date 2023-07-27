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

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <p>
        <span>
          <Link style={padding} to="/blogs">
            Blogs
          </Link>
        </span>
        &nbsp;
        <span>
          <Link style={padding} to="/users">
            Users
          </Link>
        </span>
        &nbsp;
        <span> welcome! {currentUser.username} logged in </span>
        <span>
          <button onClick={handleLogout}>Logout</button>
        </span>
      </p>

      <h1>Blog app - Menu</h1>
    </div>
  )
}

export default Menu
