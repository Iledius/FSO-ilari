import React from "react"
import { connect, useSelector, useDispatch } from "react-redux"

const Notification = (props) => {
  const msg = props.notifications

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: msg ? 1 : 0,
  }
  return <div style={style}>{msg}</div>
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

export default connect(mapStateToProps)(Notification)
