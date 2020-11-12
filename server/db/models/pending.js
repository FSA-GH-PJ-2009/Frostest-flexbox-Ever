const Sequelize = require('sequelize')
const db = require('../db')

const Pending = db.define('pending', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  orderPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Pending
