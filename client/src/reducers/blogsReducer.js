/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { sendToMessage } from "./messageReducer"

const blogsReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      return state.concat(action.payload)
    },
    deleteBlogById: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    alterBlog: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
    },

    clearBlogs: (state, action) => {
      return (state = [])
    },
    setBlogs: (state, action) => {
      return action.payload
    },

    appendComment: (state, action) => {
      const newState = state.map((blog) =>
        blog.id === action.payload.blogId
          ? blog.comments.concat(action.payload.comment)
          : blog
      )
      return newState
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newObj) => {
  return async (dispatch) => {
    try {
      const returnedObj = await blogService.create(newObj)
      dispatch(appendBlog(returnedObj))
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator > createBlog < encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      // dispatch(deleteBlogById(id))
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator > removeBlog < encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const postOneLike = (id, changedObj) => {
  return async (dispatch) => {
    try {
      const returnedObj = await blogService.update(id, changedObj)
      dispatch(alterBlog(returnedObj))
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator > postOneLike < encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const postOneComment = (blogId, newComment) => {
  return async (dispatch) => {
    try {
      const createdCommment = await blogService.createComment(
        blogId,
        newComment
      )
      dispatch(appendComment(blogId, createdCommment))
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator > postOneComment < encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const {
  appendBlog,
  deleteBlogById,
  alterBlog,
  clearBlogs,
  setBlogs,
  appendComment,
} = blogsReducer.actions
export default blogsReducer.reducer
