const router = require('express').Router()
const {Order} = require('../db/models')

//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//GET /api/orders/:orderId
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//PUT /api/orders/:orderId
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    await order.update(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
