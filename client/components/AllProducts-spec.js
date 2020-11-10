/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let allProducts

  beforeEach(() => {
    allProducts = shallow(<AllProducts />)
  })

  it('renders the All Noodles in an h1', () => {
    expect(allProducts.find('h1').text()).to.be.equal('All Noodles')
  })
})
