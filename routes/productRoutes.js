const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermission,
} = require('../middleware/authentication');

const { getSingleProductReviews } = require('../controllers//reviewController');

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require('../controllers/productController');

router
  .route('/')
  .post([authenticateUser, authorizePermission('admin')], createProduct)
  .get(getAllProducts);

router
  .route('/:id')
  .get(getProduct)
  .patch([authenticateUser, authorizePermission('admin')], updateProduct)
  .delete([authenticateUser, authorizePermission('admin')], deleteProduct);

router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermission('admin')], uploadProductImage);

router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;
