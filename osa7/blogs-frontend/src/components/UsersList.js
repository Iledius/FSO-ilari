import React from "react"

import { Link } from "react-router-dom"

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return null
  }

  const columnStyle = {
    width: "100px",
    float: "left",
    padding: "10px",
    border: "1px solid black",
  }

  return (
    <div style={{ width: "300px" }}>
      <h2>Users</h2>
      <div>
        <div style={columnStyle}>Username</div>
        <div style={columnStyle}>blogs created:</div>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div style={columnStyle}>
              <Link to={`/user/${user.id}`} key={user.id}>
                {user.name}
              </Link>
            </div>
            <div style={columnStyle}>
              <p1>{user.blogs.length}</p1>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  )
}
export default UsersList
