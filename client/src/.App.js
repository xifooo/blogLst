import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs.js"
import loginService from "./services/login.js"

import Footer from "./components/Footer.js"
import Togglable from "./components/Togglable.js"
import LoginForm from "./components/LoginForm.js"
import Notification from "./components/Notification.js"
import BlogForm from "./components/BlogForm.js"
import BlogRow from "./components/BlogRow.js"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // inspect the token expiresIn and user JSON
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const tokenExpiresIn = user["expiresIn"]
      if (tokenExpiresIn < new Date()) {
        window.localStorage.removeItem("loggedBlogAppUser")
        setUser(null)
        return
      }
      blogService.setToken(user.token)
      setUser(user)
      blogService.getAll().then((returnedBlogs) => {
        setBlogs(returnedBlogs)
      })
    }
  }, [])

  const loginToAccount = async (userNameAndPasswd) => {
    try {
      const user = await loginService.login(userNameAndPasswd)

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
        blogService.setToken(null)
        setUser(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogAppUser")
      setBlogs([])
      setUser(null)
      blogService.setToken(null)

      setTimeout(() => {
        window.location.href = "/"
      }, 5000)
    } catch (exception) {
      setErrorMessage("Logout failed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const addBlog = (blogObj) => {
    const blog = {
      ...blogObj,
      user: user.id,
    }
    blogService
      .create(blog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => setErrorMessage(`Some errors occupying ::: ${error}`))
  }

  const addOneLike = (blogId) => {
    const blog = blogs.find((item) => item.id === blogId)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(blogId, changedBlog)
      .then((returnedBlog) =>
        setBlogs(blogs.map((n) => (n.id !== blogId ? n : returnedBlog)))
      )
      .catch((error) => setErrorMessage(`Some errors occupying ::: ${error}`))
  }

  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr
    }

    const mid = Math.floor(arr.length / 2)
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)

    return merge(mergeSort(leftArr), mergeSort(rightArr))
  }

  function merge(leftArr, rightArr) {
    let i = 0,
      j = 0
    const mergedArr = []

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i].likes > rightArr[j].likes) {
        mergedArr.push(leftArr[i])
        i++
      } else {
        mergedArr.push(rightArr[j])
        j++
      }
    }

    while (i < leftArr.length) {
      mergedArr.push(leftArr[i])
      i++
    }

    while (j < rightArr.length) {
      mergedArr.push(rightArr[j])
      j++
    }

    return mergedArr
  }

  const blogsToShow = () => {
    const sortedBlogs = mergeSort(blogs)
    return sortedBlogs
  }

  const delBlog = (blogId) => {
    const blog = blogs.find((item) => item.id === blogId)
    const confirm = window.alert(`Remove this blog : ${blog.title}`)

    if (confirm) {
      blogService
        .remove(blogId)
        .then(() => setBlogs(blogs.filter((item) => item.id !== blogId)))
        .catch((error) => setErrorMessage(`Some errors occupying ::: ${error}`))
    }
  }

  return (
    <div>
      <h1> BlogLst </h1>
      <Notification message={errorMessage} />

      {
        !user && <LoginForm loginToAccount={loginToAccount} />
        // <Togglable buttonLabel="login">
        //   <LoginForm loginToAccount={loginToAccount} />
        // </Togglable>
      }

      {user && (
        <div>
          <h3>
            {user.username} logged-in :::{" "}
            <button onClick={handleLogout} data-cy="logout-button">
              Logout
            </button>
          </h3>
          <Togglable buttonLabel="create a blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>

          <ul className="no-bullets">
            {blogsToShow().map((item) => (
              <BlogRow
                key={item.id}
                blog={item}
                addOneLike={() => addOneLike(item.id)}
                delBlog={() => delBlog(item.id)}
              />
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
