const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Chỉ những ai đi qua được cửa bảo vệ (protect) mới được gọi hàm addOrderItems
router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders); // Chỉ admin mới được xem tất cả đơn hàng

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
// Chỉ admin mới được cập nhật trạng thái đã giao hàng

module.exports = router;