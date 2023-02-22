const { Router } = require('express');
const router = new Router();

const {
  createCart,
  getSingleCart,
  addProductToCart,
  getAllCarts,
} = require('../controllers/cart-controller');

router.route('/').get(getAllCarts).post(createCart);
router.route('/:cid').get(getSingleCart);
router.route('/:cid/product/:pid').post(addProductToCart);

module.exports = router;
