import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import UserService from '../service/user.service'

import UserList from '../component/UserList'

function ListContainer ({player}) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    UserService.getUsers().then(({ users }) => { setUsers(users) })
  }, [])

  return (
    <div className='row'>
      <UserList users={users} player={player} />
    </div>
  )
}

ListContainer.propTypes = {
  player: PropTypes.object.isRequired
}

export default ListContainer
