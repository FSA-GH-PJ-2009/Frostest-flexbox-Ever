const Sequelize = require('sequelize')
const db = require('../db')

const Pending = db.define('pending', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Pending
