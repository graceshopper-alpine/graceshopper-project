const router = require('express').Router()
const Product = require('../db/models')

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error)
  }
});

module.exports = router