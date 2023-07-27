// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import useTogglable from "../hooks"

import { removeBlog, postOneLike } from "../reducers/blogsReducer"
import { sendToMessage } from "../reducers/messageReducer"

const BlogRow = ({ blog, addOneLike, delBlog }) => {
  // const { visible, setVisible, toggalVisibility } = useTogglable()
  const togglable = useTogglable()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <li style={blogStyle}>
      <div style={togglable.hideWhenVisible}>
        <p>
          {blog.title} $nbsp;
          <button onClick={togglable.toggleVisibility}>View</button>
          <button onClick={() => addOneLike(blog)}>Like</button>
          <button onClick={() => delBlog(blog)}>Del</button>
        </p>
      </div>
      <div style={togglable.showWhenVisible}>
        <p>
          {blog.title} $nbsp;
          <button onClick={togglable.toggleVisibility}>Hide</button>
          <button onClick={() => addOneLike(blog)}>Like</button>
          <button onClick={() => delBlog(blog)}>Del</button>
        </p>
        <div>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
        </div>
      </div>
    </li>
  )
}

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs) // get authorized user's blogs

  const addOneLike = (obj) => {
    const changedObj = { ...obj, likes: obj.likes + 1 }
    dispatch(postOneLike(changedObj.id, changedObj))
    dispatch(
      sendToMessage(
        `The blog ${changedObj.title} just created successfully!`,
        5
      )
    )
  }

  const delBlog = (obj) => {
    const confirm = window.alert(`Remove this blog : ${obj.title}`)
    if (confirm) {
      dispatch(removeBlog(obj))
      dispatch(sendToMessage(`The blog: ${obj.title} just removed!`, 5))
    }
  }
  return (
    <ul>
      {blogs.map((item) => (
        <BlogRow
          key={item.id}
          blog={item}
          addOneLike={addOneLike}
          delBlog={delBlog}
        />
      ))}
    </ul>
  )
}

export default BlogList