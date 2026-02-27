const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        // 1. Ai là người mua? (Liên kết với bảng User)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        // 2. Mua những gì? (Mảng các sản phẩm)
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product', // Liên kết về bảng Product để biết ID gốc
                },
            },
        ],
        // 3. Giao đi đâu?
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            phone: { type: String, required: true },
        },
        // 4. Thanh toán bằng gì?
        paymentMethod: {
            type: String,
            required: true,
        },
        // 5. Kết quả thanh toán (Dùng cho PayPal/VNPay sau này)
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        // 6. Các loại phí
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        // 7. Trạng thái đơn hàng
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;