/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

import userService from "../services/users"
import loginService from "../services/login"
import blogService from "../services/blogs"

import { sendToMessage } from "./messageReducer"
import { initializeBlogs, clearBlogs } from "./blogsReducer"

const userReducer = createSlice({
  name: "user",
  initialState: { allUsers: [], currentUser: null },
  reducers: {
    setAllUsers: (state, action) => {
      return { ...state, allUsers: action.payload }
    },
    resetAllUsers: (state, action) => {
      return { ...state, allUsers: [] }
    },
    setCurrentUser: (state, action) => {
      return { ...state, currentUser: action.payload }
    },
    resetCurrentUser: (state, action) => {
      return { ...state, currentUser: null }
    },
  },
})

export const loginToAccount = ({ username, password }) => {
  // get user token
  // initialize blogs
  return async (dispatch) => {
    try {
      const us = await userService.getAll()
      dispatch(setAllUsers(us))

      const u = await loginService.login({ username, password })
      blogService.setToken(u.token)
      dispatch(setCurrentUser(u))
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator >loginToAccount< encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const setLocalAccount = (u) => {
  return (dispatch) => {
    try {
      blogService.setToken(u.token)
      dispatch(setCurrentUser(u))
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator >setLocalAccount< encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const logoutFromAccount = () => {
  // reset user, then reset blogService.setToken
  // clear blogs' state
  return (dispatch) => {
    try {
      blogService.setToken(null)
      dispatch(resetCurrentUser())
      dispatch(clearBlogs())
    } catch (exception) {
      dispatch(
        sendToMessage(
          `action creator >logoutFromAccount< encountered an error: ${exception}`,
          5
        )
      )
    }
  }
}

export const { setAllUsers, resetAllUsers, setCurrentUser, resetCurrentUser } =
  userReducer.actions
export default userReducer.reducer
