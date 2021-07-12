import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, cleanup } from "@testing-library/react"
import Blog from "../components/Blog"

describe("<Blog/>", () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: "test blog",
      author: "Teemu Teekkari",
      url: "test url",
      likes: 555,
      _id: "id12345",
    }
    component = render(<Blog addLike={mockHandler} blog={blog} />)
  })

  afterEach(cleanup)

  test("clicking like twice calls the event handler twice", () => {
    const likeButton = component.getByText("like")
    const viewButton = component.getByText("view")

    fireEvent.click(viewButton)

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test("render url and likes after show more has been pressed", () => {
    const button = component.getByText("view")

    fireEvent.click(button)

    expect(component.container).toHaveTextContent("test url")
    expect(component.container).toHaveTextContent(555)
  })
  test("renders blog title and author, not url and likes by default", () => {
    const url = component.container.querySelector("#urlDiv")
    const likes = component.container.querySelector("#likeDiv")
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })
})
