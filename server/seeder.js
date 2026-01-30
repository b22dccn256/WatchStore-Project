const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB(); // Kết nối DB để nạp dữ liệu

const importData = async () => {
    try {
        // 1. Xóa sạch dữ liệu cũ (tránh trùng lặp)
        await User.deleteMany();
        await Product.deleteMany();

        // 2. Tạo Users trước
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id; // Lấy ID của ông Admin

        // 3. Gán người tạo sản phẩm là Admin (Logic quản lý)
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // 4. Nạp Products
        await Product.insertMany(sampleProducts);

        console.log('✅ Data Imported Success!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('🔥 Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Kiểm tra tham số dòng lệnh để quyết định Xóa hay Nạp
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}