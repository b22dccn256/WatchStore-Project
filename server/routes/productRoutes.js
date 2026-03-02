const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// Khi user gọi vào đường dẫn gốc (/) -> Chạy hàm getProducts
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct); // Chỉ Admin mới được tạo sản phẩm mới


//THÊM ROUTE REVIEW (Đặt TRƯỚC route /:id để tránh xung đột)
router.route('/:id/reviews').post(protect, createProductReview);

// Khi user gọi vào đường dẫn có ID (/:id) -> Chạy hàm getProductById
// - GET: Ai cũng xem được (chi tiết sp)
// - DELETE: Chỉ Admin mới được xóa
// - PUT: Chỉ Admin mới được cập nhật
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

module.exports = router;