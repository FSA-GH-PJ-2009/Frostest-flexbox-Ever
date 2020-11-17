const router = require('express').Router()
const {Order, Product, Pending} = require('../db/models')
const {isAllowed, isAdmin} = require('../security')

router.get('/:userId', isAllowed, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        orderDate: null
      },
      include: {
        model: Pending,
        include: Product
      }
    })
    let cart
    if (order) cart = order.pendings
    else cart = []
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/item/:itemId', async (req, res, next) => {
  try {
    const item = await Pending.findByPk(req.params.itemId)
    await item.update(req.body)
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const {cart, userId} = req.body
    const [currentOrder, newOrder] = await Order.findOrCreate({
      where: {
        userId,
        orderDate: null
      }
    })
    const orderId = currentOrder.id
    await cart.map(async item => {
      const [currentPending, newPending] = await Pending.findOrCreate({
        where: {
          orderId,
          productId: item.product.id
        }
      })
      const prevQuant = currentPending.quantity
      await currentPending.update({
        quantity: prevQuant + item.quantity
      })
    })
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

router.post('/', isAllowed, async (req, res, next) => {
  try {
    const [currentOrder, newOrder] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        orderDate: null
      }
    })
    const [newPending, wasCreated] = await Pending.findOrCreate({
      where: {
        orderId: currentOrder.id,
        productId: req.body.productId
      },
      include: {
        model: Product
      }
    })
    const prevQuant = newPending.quantity
    await newPending.update({
      quantity: prevQuant + 1
    })
    res.status(201).json(newPending)
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const id = req.params.itemId
    await Pending.destroy({
      where: {
        id
      }
    })
    res.status(200).send(id)
  } catch (error) {
    next(error)
  }
})

router.delete('/order/:orderId', isAllowed, async (req, res, next) => {
  try {
    const id = req.params.orderId
    await Order.destroy({
      where: {
        id
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
