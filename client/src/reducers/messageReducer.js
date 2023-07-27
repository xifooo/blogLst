/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const messageReducer = createSlice({
  name: "message",
  initialState: null,
  reducers: {
    setMessage: (state, action) => {
      return action.payload
    },
    clearMessage: (state, action) => {
      return (state = null)
    },
  },
})

export const sendToMessage = (msg, duration) => {
  return (dispatch) => {
    dispatch(setMessage(msg))
    setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)
  }
}

export const { setMessage, clearMessage } = messageReducer.actions
export default messageReducer.reducer
