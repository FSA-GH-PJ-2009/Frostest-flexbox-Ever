const router = require('express').Router()
const {Tracker} = require('../../../../async/moodTracker/server/db/models')
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
