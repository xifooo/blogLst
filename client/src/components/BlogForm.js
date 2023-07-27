import useField from "../hooks/useField"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createBlog } from "../reducers/blogsReducer"
import { sendToMessage } from "../reducers/messageReducer"

const BlogForm = () => {
  const blogTitle = useField("text")
  const blogAuthor = useField("text")
  const blogUrl = useField("text")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      dispatch(
        createBlog({
          title: blogTitle.value,
          author: blogAuthor.value,
          url: blogUrl.value,
          likes: 0,
        })
      )
      navigate("/blogs")
      dispatch(sendToMessage(`new blog: ${blogTitle.value} created`, 5))
    } catch (exception) {
      dispatch(sendToMessage(`Some error occupyed:::${exception}`, 5))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input {...blogTitle} />
      <label>Author:</label>
      <input {...blogAuthor} />
      <label>Url:</label>
      <input {...blogUrl} />
      <button type="submit">SAVE</button>
    </form>
  )
}

export default BlogForm
