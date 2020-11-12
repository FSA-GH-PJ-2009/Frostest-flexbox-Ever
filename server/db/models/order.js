const Sequelize = require('sequelize')
const db = require('../db')

getTotal = async order => {
  let sum = 0
  let pending = await order.getPendings()
  pending.map(item => {
    sum += item.quantity * item.orderPrice
  })
  return sum
}

const Order = db.define('order', {
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return getTotal(this)
    }
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: null
  }
})

module.exports = Order
