import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postOneLike } from "../reducers/blogsReducer"
import { sendToMessage } from "../reducers/messageReducer"
import CommentList from "./CommentLst"

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
    // <div className="w-3/4 mt-6 px-6 flex justify-start items-center gap-4">
    //   <h1 className="text-slate-800 font-serif underline">{blog.title}</h1>
    //   <p>{blog.url}</p>
    //   <p>
    //     {blog.likes}&nbsp;likes
    //     <button
    //       className="font-bold text-slate-700 border px-2 py-1 rounded"
    //       onClick={addOneLike}
    //     >
    //       like
    //     </button>
    //   </p>
    //   <p>added&nbsp;by{blog.author}</p>
    //   <CommentList />
    // </div>
    <section className="block mt-4">
      <div className="pl-16">
        <h1 className="font-bold text-3xl text-slate-800">{blog.title}</h1>
        <p className="font-normal text-base hyphens-manual break-normal leading-6">
          {blog.url}
        </p>
        <p className="font-normal text-base hyphens-manual break-normal leading-6">
          {blog.author}
        </p>
        <p className="font-normal text-base hyphens-manual break-normal leading-6">
          likes: {blog.likes}
        </p>
        <div className="mt-4">
          <button
            className="bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={addOneLike}
          >
            Likes
          </button>
        </div>
        <div className="border-b mt-4"></div>
      </div>
      <CommentList />
    </section>
  )
}

export default BlogDetail
