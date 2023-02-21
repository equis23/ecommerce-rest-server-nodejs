const { Router } = require('express');
const router = new Router();

const {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require('../controllers/product-controller');

router.route('/').get(getAllProducts).post(createProduct);

router
  .route('/:pid')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
