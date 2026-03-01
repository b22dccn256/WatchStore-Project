const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Khi user gọi vào đường dẫn gốc (/) -> Chạy hàm getProducts
router.route('/').get(getProducts);

// Khi user gọi vào đường dẫn có ID (/:id) -> Chạy hàm getProductById
router.route('/:id').get(getProductById);

// - GET: Ai cũng xem được (chi tiết sp)
// - DELETE: Chỉ Admin mới được xóa
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct);

module.exports = router;