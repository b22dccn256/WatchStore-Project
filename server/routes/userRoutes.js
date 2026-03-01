const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, getUsers } = require('../controllers/userController');

const { protect, admin } = require('../middleware/authMiddleware');

// Route Đăng ký & Lấy danh sách User
router.route('/')
    .post(registerUser) // Ai cũng được đăng ký
    .get(protect, admin, getUsers); // Chỉ Admin đăng nhập rồi mới được xem danh sách

router.post('/', registerUser);

router.post('/login', authUser);

// Nghĩa là: Muốn chạy getUserProfile, phải qua cửa protect trước
router.route('/profile').get(protect, getUserProfile);

module.exports = router;