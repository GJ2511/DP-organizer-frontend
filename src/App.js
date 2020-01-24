import React, { useState } from 'react'
import DeckContainer from './container/DeckContainer'
import ListContainer from './container/ListContainer'

import Loading from './component/Loading'
import Register from './component/Register'

import UserService from './service/user.service'

function App () {
  const [name, setName] = useState('')
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)

    UserService.createUsers(name).then(response => {
      setPlayer(response)
      setLoading(false)
    })
  }

  if (loading) return <Loading />

  if (player === null) return <Register name={name} setName={setName} handleSubmit={handleSubmit} />

  return (
    <div className='container'>
      <DeckContainer playerId={player.id} />
      <ListContainer />
    </div>
  )
}

export default App
