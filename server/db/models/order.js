const Sequelize = require('sequelize')
const db = require('../db')

const getTotal = async order => {
  let sum = 0
  let pending = await order.getPendings()
  let product
  pending.map(async item => {
    if (order.orderDate) sum += item.quantity * item.orderPrice
    else {
      product = await item.getProduct()
      sum += item.quantity * product.price
    }
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
