/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import Loading from './Loading'

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Loading />)
  })

  describe('Loading', () => {
    it('renders basic markup without errors', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.find('div.container')).toBeTruthy()
      expect(wrapper.find('button')).toBeTruthy()
      expect(wrapper.find('span')).toBeTruthy()
    })
  })
})
