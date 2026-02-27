const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Chỉ những ai đi qua được cửa bảo vệ (protect) mới được gọi hàm addOrderItems
router.route('/').post(protect, addOrderItems);

module.exports = router;