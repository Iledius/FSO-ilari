import React from "react"
import { useSelector, useDispatch } from "react-redux"

const Notification = () => {
  const msg = useSelector((state) => state.notification)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: msg ? 1 : 0,
  }
  return <div style={style}>{msg}</div>
}

export default Notification
