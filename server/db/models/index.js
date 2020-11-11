const User = require('./user')
const Product = require('./product')
const Order = require('./order')

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Order)
Order.belongsTo(Product)

module.exports = {
  User,
  Product,
  Order
}
