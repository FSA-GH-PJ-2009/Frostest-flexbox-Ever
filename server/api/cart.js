const router = require('express').Router()
const {Order, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: {
        model: Product
      }
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:itemId', async (req, res, next) => {
  try {
    const item = await Order.findByPk(req.params.itemId)
    await item.update(req.body)
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId
      },
      include: {
        model: Product
      }
    })
    const prevQuant = newOrder.quantity
    await newOrder.update({
      quantity: prevQuant + 1
    })
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const id = req.params.itemId
    await Order.destroy({
      where: {
        id
      }
    })
    res.status(200).send(id)
  } catch (error) {
    next(error)
  }
})

router.delete('')

module.exports = router
