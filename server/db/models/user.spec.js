/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let test

      beforeEach(async () => {
        test = await User.create({
          email: 'hopefourie@test.com',
          password: '12345',
          firstName: 'Hope',
          lastName: 'Fourie'
        })
      })

      it('returns true if the password is correct', () => {
        expect(test.correctPassword('12345')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(test.correctPassword('123')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
