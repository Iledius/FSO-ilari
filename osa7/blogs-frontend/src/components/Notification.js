import React from "react"
import { useSelector } from "react-redux"

const errStyle = {
  margin: "15px",
  border: "5px solid red",
}

const Notification = () => {
  const msg = useSelector((state) => state.notifications)

  return (
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
}

export default Notification
