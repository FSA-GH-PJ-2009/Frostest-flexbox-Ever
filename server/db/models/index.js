const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Pending = require('./pending')

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Pending)
Pending.belongsTo(Product)

Order.hasMany(Pending)
Pending.belongsTo(Order)

module.exports = {
  User,
  Product,
  Pending,
  Order
}
