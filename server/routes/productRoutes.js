const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

// Khi user gọi vào đường dẫn gốc (/) -> Chạy hàm getProducts
router.route('/').get(getProducts);

// Khi user gọi vào đường dẫn có ID (/:id) -> Chạy hàm getProductById
router.route('/:id').get(getProductById);

module.exports = router;