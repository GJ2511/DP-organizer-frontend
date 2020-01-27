import React from 'react'
import PropTypes from 'prop-types'

function UserList ({ users, player }) {
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
        <tr key={player.id}>
          <th scope='row'>{0}</th>
          <td>{player.score}</td>
          <td>{player.name}</td>
        </tr>
        {users.map((user, index) => {
          if (user.id !== player.id) {
            return (
              <tr key={user.id}>
                <th scope='row'>{index + 1}</th>
                <td>{user.score}</td>
                <td>{user.name}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </table>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired
}

export default UserList
