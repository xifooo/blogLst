import PropType from "prop-types"

const BlogRow = ({ blog, addOneLike, delBlog }) => {
  const likesNumStyle = {
    color: "red"
  }
  return (
    <li>
      <h3>
        {blog.title}
        <button onClick={delBlog}> #DELETE# </button> |
        <span style={likesNumStyle}> {blog.likes} </span>
        <button onClick={addOneLike}> @LIKE@ </button>

      </h3>
      <p> {blog.author} {blog.url} </p>
      <hr />
    </li>
  )
}

BlogRow.propTypes = {
  blog: PropType.object.isRequired,
  addOneLike: PropType.func.isRequired,
  delBlog: PropType.func.isRequired
}

export default BlogRow