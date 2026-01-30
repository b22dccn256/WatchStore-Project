const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Liên kết với bảng User để biết ai là người tạo/quản lý
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },

    // Các thông số kỹ thuật đặc thù (Tính năng ăn điểm 10)
    specs: {
        diameter: { type: Number }, // Đường kính
        waterResistant: { type: String }, // Chống nước
        material: { type: String } // Chất liệu
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; // <--- Dòng quan trọng nhất để seeder tìm thấy