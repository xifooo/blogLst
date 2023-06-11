import { useState } from "react"
import PropType from "prop-types"

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0
  })

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

  const handleAddBlog = e => {
    try {
      e.preventDefault()
      addBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes || 0
      })
      setNewBlog({
        title: "",
        author: "",
        url: "",
        likes: 0
      })
    } catch (exception) {
      window.alert(`Wrong occupying ::: ${exception}`)
    }

  }
  return (
    <form onSubmit={handleAddBlog}>
      <label>Title: <input name="title" value={newBlog.title} onChange={handleTitleChange} /> </label> <br />
      <label>Author: <input name="author" value={newBlog.author} onChange={handleAuthorChange} /> </label> <br />
      <label>Url: <input name="url" value={newBlog.url} onChange={handleUrlChange} /> </label> <br />
      <label>Likes: <input name="likes" value={newBlog.likes} onChange={handleLikesChange} /> </label> <br />
      <button type="submit"> SAVE </button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropType.func.isRequired
}

export default BlogForm