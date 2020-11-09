const User = require('./user')
const Product = require('./product')
const Pending = require('./pending')

User.hasMany(Pending)
Pending.belongsTo(User)

Product.hasMany(Pending)
Pending.belongsTo(Product)

module.exports = {
  User,
  Product,
  Pending
}
