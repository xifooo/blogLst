import { useSelector } from "react-redux"

import { Link, useNavigate } from "react-router-dom"

const BlogRow = ({ blog }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }
  return (
    // <div className="font-serif text-slate-800 px-6 py-3 flex items-center justify-start">
    //   <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    // </div>
    <li>
      <Link
        to={`/blogs/${blog.id}`}
        className="hover:bg-slate-50 hover:shadow-md hover:ring-blue-500 rounded-lg bg-white shadow-sm ring-1 ring-slate-200 px-4 py-6 block"
      >
        <p className="text-slate-800 font-bold text-2xl">{blog.title}</p>
        <p className="line-clamp-2 text-slate-400 text-sm leading-4 font-normal pt-1">
          {blog.url}
        </p>
      </Link>
    </li>
  )
}

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()

  return (
    // <div className="w-3/4 mt-6 flex justify-start items-center gap-4">
    //   <p className="flex justify-center py-2">
    //     <button
    //       className="px-2 py-2 border rounded font-bold text-blue-600 bg-white"
    //       onClick={() => navigate("/create-new")}
    //     >
    //       create new
    //     </button>
    //   </p>
    //   {blogs.map((item) => (
    //     <BlogRow key={item.id} blog={item} />
    //   ))}
    // </div>
    <section className="block mx-auto">
      <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-sm leading-6">
        <li className="flex">
          <a
            onClick={() => navigate("/create-new")}
            className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3"
          >
            <svg
              className="group-hover:text-blue-500 mb-1 text-slate-400"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            Create New
          </a>
        </li>
        {blogs.map((item) => (
          <BlogRow key={item.id} blog={item} />
        ))}
      </ul>
    </section>
  )
}

export default BlogList
