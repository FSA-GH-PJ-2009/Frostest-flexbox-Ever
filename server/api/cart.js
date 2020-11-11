const router = require('express').Router()
const {Pending, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Pending.findAll({
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
    const item = await Pending.findByPk(req.params.itemId)
    await item.update(req.body)
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPending = await Pending.findOrCreate({
      where: {
        userId: req.body.userId,
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

router.delete('')

module.exports = router
