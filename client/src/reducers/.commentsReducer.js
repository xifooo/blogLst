import { createSlice } from "@reduxjs/toolkit"
import commentService from "../services/comments"
import { sendToMessage } from "./messageReducer"

const commentReducer = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    appendComment: (state, action) => {
      return state[`${action.payload.blogId}`].push(action.payload.comment)
    },
  },
})

export const postOneComment = (blogId, newComment) => {
  return async (dispatch) => {
    try {
      const createdCommment = await commentService.createComment(
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
export const { appendComment } = commentReducer.actions
export default commentReducer.reducer
