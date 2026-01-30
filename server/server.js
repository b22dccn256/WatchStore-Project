const express = require('express');
const dotenv = require('dotenv');

const users = require('./data/users');
const products = require('./data/products');
// const User = require('./models/User');

const cors = require('cors');
const connectDB = require('./config/db'); // Sẽ tạo ở bước sau

const productRoutes = require('./routes/productRoutes'); // <--- 1. Import vào

// Cấu hình
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Để đọc được JSON từ body request
app.use(cors()); // Chấp nhận request từ mọi nơi (hoặc config riêng cho client)

// Sử dụng Route
// Bất cứ request nào bắt đầu bằng /api/products sẽ chạy vào productRoutes
app.use('/api/products', productRoutes); // <--- 2. Kích hoạt Route

// Database Connection
connectDB(); // Tạm thời comment lại để test server chạy trước

// Routes Demo
app.get('/', (req, res) => {
    res.send('API WatchStore đang hoạt động!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});