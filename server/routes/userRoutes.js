const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser } = require('../controllers/userController');
// Import middleware bảo vệ (sẽ tạo ngay sau đây, tạm thời comment lại để test login trước)
// const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser); // Đăng ký
router.post('/login', authUser); // Đăng nhập
// router.route('/profile').get(protect, getUserProfile); // Xem profile (Tạm đóng)

module.exports = router;