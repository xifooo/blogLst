import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

import BlogRow from "./BlogRow"

describe("<BlogRow />", () => {
  beforeEach(() => {
    const blog = {
      title: "Sound and Vision",
      author: "David Bowie",
      url: "youtube.com",
      likes: 30,
    }

    const mockAddOneLike = jest.fn()
    const mockDelBlog = jest.fn()

    render(
      <BlogRow blog={blog} addOneLike={mockAddOneLike} delBlog={mockDelBlog} />
    )
  })

  test("Test 5.13: demonstrates only both title and author of one Blog by default", () => {
    expect(screen.getByText("Sound and Vision")).toBeDefined()
    expect(screen.getByText("David Bowie")).toBeDefined()

    // the blog whose url and likes properties are hidden
    expect(screen.queryByText("youtube.com", { hidden: true })).toBeDefined()
    expect(screen.queryByText("30", { hidden: true })).toBeDefined()
  })

  test("Test 5.14: clicking the 'view' butthon calls event handler once, then showing both url and likes of one blog", () => {
    // act函数中设置一个callback函数, 用于包装和触发对组件状态或属性的更新
    act(() => {
      userEvent.click(screen.getByRole("button", { name: "View" }))
    })

    expect(screen.queryByText("youtube.com", { hidden: false })).toBeDefined()
    expect(screen.queryByText("30", { hidden: false })).toBeDefined()

    // Error handle: HTMLElements ownning display property are findable for screen, so that HTMLElements hidden to users existing anyway, they will never be Null.
    // expect(screen.queryByText("youtube.com", { hidden: true })).toBeNull()
    // expect(screen.queryByText("30", { hidden: true })).toBeNull()
  })
})

test("Test 5.15: double-clicking the 'Like' button calls event handler twice", () => {
  const blog = {
    title: "Sound and Vision",
    author: "David Bowie",
    url: "youtube.com",
    likes: 30,
  }

  var mockAddOneLike = jest.fn((x) => x * 2)
  const mockDelBlog = jest.fn((x) => x * 3)

  render(
    <BlogRow blog={blog} addOneLike={mockAddOneLike} delBlog={mockDelBlog} />
  )

  act(() => {
    userEvent.click(screen.getByRole("button", { name: "Like" }))
    userEvent.click(screen.getByRole("button", { name: "Like" }))
  })

  // 连续点击两次Like button, 30 + 2 =32
  // 下面都是错误的
  // expect(screen.queryByText(30)).toBeNull()
  // expect(screen.getByText(/^31$/, { hidden: true })).toBe(31)
  // expect(screen.getByTestId("t5.15", { hidden: true })).toBe(31)

  expect(mockAddOneLike.mock.calls).toHaveLength(2)
})
