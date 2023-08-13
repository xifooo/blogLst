import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postOneComment } from "../reducers/blogsReducer"
import { sendToMessage } from "../reducers/messageReducer"

// const CommentRow = ({ item }) => {
//   // <li className="border-l-2 hover:border-gray-400 px-4">Item1</li>
//   return (<li className="border-l-2 hover:border-gray-400 px-4">{item}</li>)
// }

const CommentList = () => {
  const paramId = useParams().id
  const blog = useSelector(
    (state) => state.blogs.filter((item) => item.id === paramId)[0]
  )
  const comments = blog.comments

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      console.log(`id: ${blog.id}, value: ${e.target.comment.value}`)
      const newComment = { content: e.target.comment.value }
      dispatch(postOneComment(blog.id, newComment))
    } catch (exception) {
      dispatch(sendToMessage(`Some error occupying: #${exception}`, 5))
    }
  }

  return (
    // <div className="flex justify-start items-center gap-2 mt-6">
    //   <h3 className="font-serif text-slate-800">comments</h3>
    //   <form onSubmit={handleSubmit}>
    //     <input className="px-2 border rounded-md" name="comment" type="text" />
    //     <button
    //       className="font-bold text-slate-700 border px-2 py-1 rounded"
    //       type="submit"
    //     >
    //       add a comment
    //     </button>
    //   </form>
    //   <div>
    //     {comments ? (
    //       <ul>
    //         {comments.map((item, index) => (
    //           <li key={index}>{item}</li>
    //         ))}
    //       </ul>
    //     ) : null}
    //   </div>
    // </div>
    <section className="block">
      <div className="flex flex-col justify-start pl-16">
        <h2 className="font-serif font-bold text-3xl">Comments</h2>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 py-4 pr-8"
          >
            <input
              type="text"
              name="comment"
              placeholder="Enter comments"
              className="max-w-lg text-ellipsis shadow appearance-none border text-gray-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700"
            />
            <button
              className="px-4 py-2 rounded font-bold text-white bg-slate-600 hover:bg-slate-400"
              type="submit"
            >
              submit
            </button>
          </form>
        </div>
        <div className="xs:columns-1 sm:columns-2 md:columns-2 lg:columns-3 columns-3 mt-2 ">
          {comments ? (
            <ul className="w-full space-y-2 flex flex-col text-base px-4">
              {comments.map((item, index) => (
                <li
                  key={index}
                  className="border-l-2 hover:border-gray-400 px-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default CommentList
