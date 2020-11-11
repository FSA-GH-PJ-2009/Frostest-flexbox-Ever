const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  orderPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: null
  }
})

module.exports = Order
