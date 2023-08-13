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
    // <form
    //   className="w-full mt-40 flex justify-center items-center gap-2"
    //   onSubmit={handleSubmit}
    // >
    //   <label>Title:</label>
    //   <input className="px-2 border rounded-md" {...blogTitle} />
    //   <label>Author:</label>
    //   <input className="px-2 border rounded-md" {...blogAuthor} />
    //   <label>Url:</label>
    //   <input className="px-2 border rounded-md" {...blogUrl} />
    //   <button
    //     className="px-2 py-2 border rounded font-bold text-blue-600 bg-white"
    //     type="submit"
    //   >
    //     SAVE
    //   </button>
    // </form>
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-base">
            Title
          </label>
          <input
            {...blogTitle}
            className="shadow appearance-none border text-gray-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700"
            placeholder="Enter title of blog"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-base">
            Author
          </label>
          <input
            {...blogAuthor}
            className="shadow appearance-none border text-gray-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700"
            placeholder="Enter author of blog"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-base">
            Url
          </label>
          <input
            {...blogUrl}
            className="shadow appearance-none border text-gray-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700"
            placeholder="Enter url of blog"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
