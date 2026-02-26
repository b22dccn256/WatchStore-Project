const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Đăng nhập & Lấy Token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });

    // Kiểm tra: Nếu có user VÀ mật khẩu khớp (dùng bcrypt để so sánh)
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // Trả về "Thẻ ra vào"
        });
    } else {
        res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
};

// @desc    Đăng ký tài khoản mới
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'Email này đã được sử dụng' });
    }

    // Tạo user mới (Mật khẩu sẽ được mã hóa tự động nếu ta dùng middleware ở Model, 
    // nhưng ở bước Seeding ta đã hash thủ công. Để đơn giản, ta hash ngay tại đây)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }
};

// @desc    Lấy thông tin cá nhân (Profile)
// @route   GET /api/users/profile
// @access  Private (Cần đăng nhập)
const getUserProfile = async (req, res) => {
    // req.user sẽ có được nhờ Middleware bảo vệ (sẽ làm ở bước sau)
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
};

module.exports = { authUser, getUserProfile, registerUser };