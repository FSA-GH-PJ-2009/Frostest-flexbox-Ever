const router = require('express').Router()
const {User, Order, Pending, Product} = require('../db/models')
const {isAdmin, isAllowed} = require('../security')
const {Op} = require('sequelize')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/history/:userId', async (req, res, next) => {
  try {
    let orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        orderDate: {
          [Op.not]: null
        }
      },
      include: {
        model: Pending,
        include: Product
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
