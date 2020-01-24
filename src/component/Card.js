import React from 'react'
import PropTypes from 'prop-types'

import './Card.css'

function Card ({ card, isflipped, deckId, handleClick, disabled }) {
  const src = isflipped ? card.image : '/back.jpeg'

  return (
    <div className='card col-2' onClick={e => isflipped || disabled ? null : handleClick(deckId, card)}>
      <img src={src} alt='Card' />
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  deckId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  isflipped: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Card
