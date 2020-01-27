import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Deck from '../component/Deck'
import DeckService from '../service/deck.service'
import UserService from '../service/user.service'

function DeckContainer ({ playerId, updateCurrentPlayerScore }) {
  const [noOfTurn, setNoOfTurn] = useState(0)
  const [firstDeck, setFirstDeck] = useState([])
  const [secondDeck, setSecondDeck] = useState([])
  const [flipped, setFlipped] = useState({})
  const [solved, setSolved] = useState([])
  const [counter, setCounter] = useState(1)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUpDecks()
  }, [])

  useEffect(() => {
    if (solved.length === 9) {
      setLoading(true)
      saveScore()
      resetState()
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

  const shuffleCards = cards => {
    const newCards = []; const visitedIndex = []
    const length = cards.length

    while (visitedIndex.length !== cards.length) {
      const position = Math.floor(Math.random() * length)
      if (visitedIndex.find(index => index === position) === undefined) {
        visitedIndex.push(position)
        newCards.push({ ...cards[position] })
      }
    }
    return newCards
  }

  const setUpDecks = async () => {
    try {
      // eslint-disable-next-line camelcase
      const { deck_id } = await DeckService.getDeck()
      const { cards } = await DeckService.getCards(deck_id)
      setFirstDeck(cards)
      setSecondDeck(shuffleCards(cards))
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const resetState = () => {
    setNoOfTurn(0)
    setFirstDeck([])
    setSecondDeck([])
    setFlipped({})
    setSolved([])
    setCounter(1)
    setDisabled(false)
  }

  const handleShuffleClick = () => {
    setLoading(true)
    resetState()
    setFirstDeck(shuffleCards(firstDeck))
    setSecondDeck(shuffleCards(secondDeck))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleResetClick = () => {
    setLoading(true)
    resetState()
    saveScore()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const saveScore = () => {
    UserService.saveScore({ playerId, noOfTurn }).then(() => {
      updateCurrentPlayerScore(noOfTurn)
      handleShuffleClick()
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
          <Deck
            deckId='1'
            loading={loading}
            cards={firstDeck}
            handleClick={handleClick}
            flipped={flipped}
            solved={solved}
            disabled={disabled}
          />
        </div>

        <div className='col-6'>
          <Deck
            deckId='2'
            loading={loading}
            cards={secondDeck}
            handleClick={handleClick}
            flipped={flipped}
            solved={solved}
            disabled={disabled}
          />
        </div>
      </div>

    </>
  )
}

DeckContainer.propTypes = {
  playerId: PropTypes.string.isRequired,
  updateCurrentPlayerScore: PropTypes.func.isRequired
}

export default DeckContainer
