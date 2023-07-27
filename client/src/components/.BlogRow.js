import { useState } from "react"
import PropTypes from "prop-types"

const BlogRow = ({ blog, addOneLike, delBlog }) => {
  const [visibilityOfRest, setVisibilityOfRest] = useState(false)

  const hideWhenVisible = { display: visibilityOfRest ? "none" : "" }
  const showWhenVisible = { display: visibilityOfRest ? "" : "none" }

  const toggleVisibility = () => {
    return setVisibilityOfRest(!visibilityOfRest)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const horizontalLineStyle = {
    width: "50%",
    height: 1,
  }
  const paragraphStyle = {
    color: "rgb(77,77,77)",
  }
  return (
    <li>
      <div style={blogStyle}>
        <h3> {blog.title} </h3>
        <hr style={horizontalLineStyle} />
        <p>
          <span> Author: </span>
          <span> {blog.author} </span>
        </p>

        <div style={hideWhenVisible}>
          <p>
            <button onClick={toggleVisibility} data-cy="view-button">
              View
            </button>
            &nbsp;
            <button onClick={delBlog} data-cy="delete-button">
              Delete
            </button>
            &nbsp;
            <button onClick={addOneLike} data-cy="like-button">
              Like
            </button>
          </p>
        </div>

        <div style={showWhenVisible}>
          <p style={paragraphStyle}>
            <span> URL </span>
            <span>{blog.url}</span>
          </p>
          <p style={paragraphStyle}>
            <span> Likes </span>
            <span data-testid="t5.15">{blog.likes}</span>
          </p>
          <p>
            <button onClick={toggleVisibility} data-cy="hide-button">
              Hide
            </button>
            &nbsp;
            <button onClick={delBlog} data-cy="delete-button">
              Delete
            </button>
            &nbsp;
            <button onClick={addOneLike} data-cy="like-button">
              Like
            </button>
            {/* <button onClick={toggleVisibility}>Hide</button> &nbsp;
            <button onClick={delBlog}>Delete</button> &nbsp;
            <button onClick={addOneLike}>Like</button> */}
          </p>
        </div>
      </div>
    </li>
  )
}

BlogRow.propTypes = {
  blog: PropTypes.object.isRequired,
  addOneLike: PropTypes.func.isRequired,
  delBlog: PropTypes.func.isRequired,
}

export default BlogRow
