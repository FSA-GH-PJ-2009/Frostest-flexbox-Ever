/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let test

      beforeEach(async () => {
        test = await Product.create({
          name: 'Veggie Ramen',
          description: 'delish',
          inventory: 3,
          price: 15.0
        })
      })

      it('returns true if the name is correct', () => {
        expect(test.name).to.be.equal('Veggie Ramen')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
