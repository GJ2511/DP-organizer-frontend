import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Deck from '../component/Deck'
import DeckService from '../service/deck.service'
import UserService from '../service/user.service'

function DeckContainer ({ playerId }) {
  const [noOfTurn, setNoOfTurn] = useState(0)
  const [firstDeck, setFirstDeck] = useState(null)
  const [secondDeck, setSecondDeck] = useState(null)
  const [flipped, setFlipped] = useState({})
  const [solved, setSolved] = useState([])
  const [counter, setCounter] = useState(1)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setUpDecks()
  }, [])

  useEffect(() => {
    if (solved.length === 52) {
      saveScore()
    }
  }, [solved])

  const handleClick = (deckId, { code }) => {
    setCounter(counter + 1)

    if (counter === 2) {
      setNoOfTurn(noOfTurn + 1)
      setCounter(1)
    }
    const keys = Object.keys(flipped)
    const length = keys.length

    if (length === 0) {
      setFlipped({ [deckId]: code })
    } else if (length === 1 && flipped[deckId]) {
      setFlipped({ [deckId]: code })
    } else {
      if (flipped[keys[0]] === code) {
        setSolved([...solved, code])
        setFlipped({})
      } else {
        setFlipped({ ...flipped, [deckId]: code })
        setDisabled(true)
        setTimeout(() => {
          setFlipped({})
          setDisabled(false)
        }, 1000)
      }
    }
  }

  const setUpDecks = () => {
    Promise.all([
      DeckService.getDeck(),
      DeckService.getDeck()
    ]).then(([first, second]) => {
      setFirstDeck(first)
      setSecondDeck(second)
    }).catch(err => {
      console.error(err)
    })
  }

  const resetState = () => {
    setNoOfTurn(0)
    setFirstDeck(null)
    setSecondDeck(null)
    setFlipped({})
    setSolved([])
    setCounter(1)
    setDisabled(false)
  }

  const handleShuffleClick = () => {
    resetState()
    setUpDecks()
  }

  const handleResetClick = () => {
    saveScore()
  }

  const saveScore = () => {
    UserService.saveScore({ playerId, noOfTurn }).then(() => {
      resetState()
      setUpDecks()
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-2'>
          <button type='button' className='btn btn-light' onClick={() => handleShuffleClick()}>Play/Shuffle</button>
        </div>
        <div className='col-2'>
          <button type='button' className='btn btn-light' disabled={!noOfTurn} onClick={() => handleResetClick()}>Reset High Score</button>
        </div>
        <div className='offset-md-5 col-3'>Turns so far: {noOfTurn}</div>
      </div>
      <div className='row'>
        <div className='col-6'>
          <Deck deckId={firstDeck && firstDeck.deck_id} handleClick={handleClick} flipped={flipped} solved={solved} disabled={disabled} />
        </div>

        <div className='col-6'>
          <Deck deckId={secondDeck && secondDeck.deck_id} handleClick={handleClick} flipped={flipped} solved={solved} disabled={disabled} />
        </div>
      </div>

    </>
  )
}

DeckContainer.propTypes = {
  playerId: PropTypes.string.isRequired
}

export default DeckContainer
