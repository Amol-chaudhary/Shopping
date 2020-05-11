const express = require('express');
const {
  ProductsById,
  allProducts,
  getProducts,
  updateProducts,
  deleteProducts,
  create,
} = require('../controllers/Products');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/products', allProducts);
router.post('/products/create', create);
router.get('/products/:productsId', getProducts);
router.put('/products/:productsId', updateProducts);
router.delete('/products/:productsId', deleteProducts);

router.param('productsId', ProductsById);

module.exports = router;
