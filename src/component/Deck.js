import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

import './Deck.css'

function Deck ({ deckId, cards, handleClick, flipped, solved, disabled, loading }) {
  const renderCard = () => {
    const cardList = cards.map((card) => {
      let isflipped = false

      if (Object.keys(flipped).length > 0) {
        if (flipped[deckId] && flipped[deckId] === card.code) {
          isflipped = true
        }
      }

      if (solved.includes(card.code)) {
        isflipped = true
      }

      return <Card key={card.code} card={card} isflipped={isflipped} handleClick={handleClick} deckId={deckId} disabled={disabled} />
    })

    return cardList
  }

  return (
    <div className='deck row overflow-auto'>
      {loading ? 'Loading...' : renderCard()}
    </div>
  )
}

Deck.propTypes = {
  deckId: PropTypes.string,
  cards: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  flipped: PropTypes.object.isRequired,
  solved: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Deck
