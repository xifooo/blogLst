import { useState, useEffect } from "react"
import blogService from "./services/blogs.js"
import loginService from "./services/login.js"

import BlogRow from "./components/BlogRow.js"
import Footer from "./components/Footer.js"
import Notification from "./components/Notification.js"


// const BlogRow = ({ blog }) => {
//   return (<li> {blog.title} ::: {blog.author} </li>)
// }

// const Footer = () => {
//   const footerStyle = {
//     color: "green",
//     fontStyle: "italic",
//     fontSize: 16
//   }
//   return (
//     <div style={footerStyle}>
//       <br />
//       <em> BlogLst App </em>
//     </div>
//   )
// }

// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   } else {
//     return <div className="error"> {message} </div>
//   }
// }


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0
  })
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(returnedBlogs => {
        setBlogs(returnedBlogs)
      })
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      // setErrorMessage(`Welcome! ${user.username}`)
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    } catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <label>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button type="submit"> Login </button>
    </form>
  );

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogAppUser")
      setBlogs([])
      blogService.setToken(null)
      setUser(null)

      setTimeout(() => {
        window.location.href = "/"
      }, 5000)
    } catch (exception) {
      setErrorMessage("Logout failed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };


  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: user.id
    }
    blogService
      .create(blog)
      .then(res => {
        setErrorMessage(`A New Blog :《${newBlog.title}》 by ${newBlog.author} added!`)
        setBlogs(blogs.concat(res))
        setNewBlog({
          title: "",
          author: "",
          url: "",
          likes: 0
        })
        setTimeout(() =>{
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Some errors occupying ::: ${error}`)
      })
  };

  const handleTitleChange = e => {
    setNewBlog({
      ...newBlog,
      title: e.target.value
    })
  }
  const handleAuthorChange = e => {
    setNewBlog({
      ...newBlog,
      author: e.target.value
    })
  }
  const handleUrlChange = e => {
    setNewBlog({
      ...newBlog,
      url: e.target.value
    })
  }
  const handleLikesChange = e => {
    setNewBlog({
      ...newBlog,
      likes: e.target.value
    })
  }

  const loggedInfo = () => (
    <h3>
      {user.name} logged-in ::: <button onClick={handleLogout}> Logout </button>
    </h3>

  )
  const blogForm = () => (
    <>
      {loggedInfo()}

      <form onSubmit={addBlog}>
        <label>Title: <input name="title" value={newBlog.title} onChange={handleTitleChange} /> </label> <br />
        <label>Author: <input name="author" value={newBlog.author} onChange={handleAuthorChange} /> </label> <br />
        <label>Url: <input name="url" value={newBlog.url} onChange={handleUrlChange} /> </label> <br />
        <label>Likes: <input name="likes" value={newBlog.likes} onChange={handleLikesChange} /> </label> <br />
        <button type="submit"> SAVE </button>
      </form>

      {blogs.map(item =>
        <BlogRow key={item.id} blog={item} />
      )}
    </>
  );

  return (
    <div>
      <h1> BlogLst </h1>
      <Notification message={errorMessage} />

      {user === null
        ? loginForm()
        : blogForm()
      }

      <Footer />
    </div>
  )
}

export default App