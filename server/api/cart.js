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

module.exports = router
