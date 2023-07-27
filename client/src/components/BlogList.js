import { useSelector } from "react-redux"

import { Link, useNavigate } from "react-router-dom"

const BlogRow = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()

  return (
    <div>
      <p>
        <button onClick={() => navigate("/create-new")}>create new</button>
      </p>
      {blogs.map((item) => (
        <BlogRow key={item.id} blog={item} />
      ))}
    </div>
  )
}

export default BlogList
