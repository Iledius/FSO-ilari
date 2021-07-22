import React from "react"
const errStyle = {
  margin: "15px",
  border: "5px solid red",
}

const Notification = ({ msg }) => (
  <div
    className="error"
    style={{
      ...errStyle,
      visibility: msg ? "visible" : "hidden",
    }}
  >
    <h1>{msg}</h1>
  </div>
)

export default Notification
