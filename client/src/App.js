import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setLocalAccount, logoutFromAccount } from "./reducers/userReducer"

import { Routes, Route, Navigate, Link } from "react-router-dom"

import Menu from "./components/Menu"
import Message from "./components/Message"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import BlogDetail from "./components/BlogDetail"
import BlogForm from "./components/BlogForm"
import UserList from "./components/UserList"
import UserDetail from "./components/UserDetail"
import Footer from "./components/Footer"

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser)

  // console.log(`App: currentUser state: ${JSON.stringify(currentUser)}`)

  const dispatch = useDispatch()

  const checkLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    // console.log(`checkLocalStorage: loggedUserJSON= ${loggedUserJSON}`)
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
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (!loggedUserJSON) {
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(currentUser)
      )
    }
  }

  useEffect(() => {
    checkLocalStorage()
  }, [currentUser])

  useEffect(() => {
    storeUserInfo()
  }, [currentUser])
  return (
    <div>
      {currentUser !== null ? (
        <Menu />
      ) : (
        <h1 className="font-serif font-bold text-3xl px-6">Blog App</h1>
      )}
      <Message />

      <Routes>
        <Route
          path="/"
          element={
            <div className="ml-8">
              <h1>hello</h1>
              <Link to="/login">Login</Link>
            </div>
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? <Navigate replace to="/blogs" /> : <LoginForm />
          }
        />
        <Route
          path="/blogs"
          element={
            currentUser ? <BlogList /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            currentUser ? <BlogDetail /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/create-new"
          element={
            currentUser ? <BlogForm /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users"
          element={
            currentUser ? <UserList /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users/:id"
          element={
            currentUser ? <UserDetail /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
