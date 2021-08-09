import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "../components/BlogForm"

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const handleSubmit = jest.fn()

  const component = render(<BlogForm handleSubmit={handleSubmit} />)

  const title = component.container.querySelector("#title")
  const form = component.container.querySelector("form")

  fireEvent.change(title, {
    target: { value: "testing of forms could be easier" },
  })
  fireEvent.submit(form)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  expect(handleSubmit.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  )
})
