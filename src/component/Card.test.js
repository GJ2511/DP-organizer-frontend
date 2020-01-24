/* eslint-disable no-undef */
import React from 'react'
import Card from './Card'
import { shallow } from 'enzyme'

const props = {
  card: {
    image: 'test'
  },
  isflipped: false,
  deckId: '1',
  handleClick: jest.fn(),
  disabled: false
}

describe('<Card/>', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Card {...props} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
