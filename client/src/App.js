import { useSelector } from "react-redux"

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

  return (
    <div>
      {currentUser !== null ? <Menu /> : <h1>Blog App</h1>}
      <Message />

      <Routes>
        <Route
          path="/"
          element={
            <div>
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
