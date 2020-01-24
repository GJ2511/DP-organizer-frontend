import React from 'react'
import PropTypes from 'prop-types'

function UserList ({ users }) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Turns</th>
          <th scope='col'>Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <th scope='row'>{index + 1}</th>
              <td>{user.score}</td>
              <td>{user.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default UserList
