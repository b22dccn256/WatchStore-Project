const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@watchstore.com',
        password: bcrypt.hashSync('123456', 10), // Mật khẩu đã mã hóa
        isAdmin: true,
        phone: '0987654321'
    },
    {
        name: 'Nguyen Van Khach',
        email: 'khach@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        phone: '0912345678'
    }
];

module.exports = users;