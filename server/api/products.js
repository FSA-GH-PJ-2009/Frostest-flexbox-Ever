const router = require('express').Router()
const {Product} = require('../db/models')

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      attributes: ['id', 'name', 'price', 'imageUrl', 'description']
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
