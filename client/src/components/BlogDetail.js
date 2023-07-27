import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postOneLike } from "../reducers/blogsReducer"
import { sendToMessage } from "../reducers/messageReducer"

const BlogDetail = () => {
  const paramId = useParams().id
  const blog = useSelector(
    (state) => state.blogs.filter((b) => b.id === paramId)[0]
  )

  const dispatch = useDispatch()

  const addOneLike = () => {
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      dispatch(postOneLike(changedBlog.id, changedBlog))
      dispatch(
        sendToMessage(
          `The blog ${changedBlog.title} just created successfully!`,
          5
        )
      )
    } catch (exception) {
      dispatch(sendToMessage(`Some error occupying::: ${exception}`, 5))
    }
  }

  // const delBlog = (blog) => {
  //   const confirm = window.alert(`Remove this blog : ${blog.title}`)
  //   if (confirm) {
  //     dispatch(removeBlog(blog))
  //     dispatch(sendToMessage(`The blog: ${blog.title} just removed!`, 5))
  //   }
  // }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>
        {blog.likes}&nbsp;likes
        <button onClick={addOneLike}>like</button>
      </p>
      <p>added&nbsp;by{blog.author}</p>
    </div>
  )
}

export default BlogDetail
