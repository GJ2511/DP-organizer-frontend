import React, { useState, useEffect } from 'react'

import UserService from '../service/user.service'

import UserList from '../component/UserList'

function ListContainer () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    UserService.getUsers().then(({ users }) => { setUsers(users) })
  }, [])

  return (
    <div className='row'>
      <UserList users={users} />
    </div>
  )
}

export default ListContainer
