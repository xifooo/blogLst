import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  })

  const handleTitleChange = (e) => {
    setNewBlog({
      ...newBlog,
      title: e.target.value,
    })
  }
  const handleAuthorChange = (e) => {
    setNewBlog({
      ...newBlog,
      author: e.target.value,
    })
  }
  const handleUrlChange = (e) => {
    setNewBlog({
      ...newBlog,
      url: e.target.value,
    })
  }
  const handleLikesChange = (e) => {
    setNewBlog({
      ...newBlog,
      likes: e.target.value,
    })
  }

  const handleAddBlog = (e) => {
    try {
      e.preventDefault()
      addBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes || 0,
      })
      setNewBlog({
        title: "",
        author: "",
        url: "",
        likes: 0,
      })
    } catch (exception) {
      window.alert(`Wrong occupying ::: ${exception}`)
    }
  }
  return (
    <form onSubmit={handleAddBlog}>
      <label>Title:</label>
      <input
        name="title"
        value={newBlog.title}
        onChange={handleTitleChange}
        placeholder="title"
      />
      <br />
      <label>Author:</label>
      <input
        name="author"
        value={newBlog.author}
        onChange={handleAuthorChange}
        placeholder="author"
      />
      <br />
      <label>Url:</label>
      <input
        name="url"
        value={newBlog.url}
        onChange={handleUrlChange}
        placeholder="url"
      />
      <br />
      <label>Likes:</label>
      <input
        name="likes"
        value={newBlog.likes}
        onChange={handleLikesChange}
        placeholder="likes"
      />
      <br />
      <button type="submit" data-cy="blog-save-button">
        {" "}
        SAVE{" "}
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
