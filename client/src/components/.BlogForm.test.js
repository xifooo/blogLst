import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

import BlogForm from "./BlogForm"

test("5.16: a valid blog content should be added after calling event handler once", () => {
  // const newBlog = {
  //   title: "Another one bits the dust",
  //   author: "Queen",
  //   url: "england...",
  //   likes: 10
  // }
  const addBlog = jest.fn()

  render(<BlogForm addBlog={addBlog} />)

  const sendButton = screen.getByText("SAVE")

  act(() => {
    userEvent.type(
      screen.getByPlaceholderText("title", { exact: true }),
      "Another one bits the dust"
    )
    userEvent.type(
      screen.getByPlaceholderText("author", { exact: true }),
      "Queen"
    )
    userEvent.type(
      screen.getByPlaceholderText("url", { exact: true }),
      "england..."
    )
    userEvent.type(screen.getByPlaceholderText("likes", { exact: true }), 10)
  })

  act(() => {
    userEvent.click(sendButton)
  })

  expect(addBlog.mock.calls).toHaveLength(1)
})
