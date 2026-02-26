const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser } = require('../controllers/userController');

// 1. Import middleware vừa tạo
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', authUser);

// 2. Thêm 'protect' vào giữa đường dẫn và hàm xử lý
// Nghĩa là: Muốn chạy getUserProfile, phải qua cửa protect trước
router.route('/profile').get(protect, getUserProfile);

module.exports = router;