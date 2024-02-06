import { render, screen } from "@testing-library/react"

import Button from "./Button"

test("check if disabled prop works", () => {
  render(<Button disabled={true}>Click</Button>)
  const button = screen.getByText("Click")
  expect(button).toBeInTheDocument()
  expect(button).toBeDisabled()
})
