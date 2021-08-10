import React from "react"

import { Link } from "react-router-dom"

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <div>
        {users.map((user) => (
          <Link to={`/user/${user.id}`} key={user.id}>
            {user.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
export default UsersList
