import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Card from './Card'
import DeckService from '../service/deck.service'

import './Deck.css'

function Deck ({ deckId, handleClick, flipped, solved, disabled }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    if (deckId === null) return

    DeckService.getCards(deckId).then(({ cards }) => {
      setCards(cards)
    }).catch(err => {
      console.error(err)
    })
  }, [deckId])

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
      {!deckId ? 'Loading...' : renderCard()}
    </div>
  )
}

Deck.propTypes = {
  deckId: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  flipped: PropTypes.object.isRequired,
  solved: PropTypes.array.isRequired
}

export default Deck
