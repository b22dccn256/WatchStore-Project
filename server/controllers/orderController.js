const Order = require('../models/Order');

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
// @access  Private (Chỉ user đã đăng nhập mới gọi được)
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Kiểm tra xem giỏ hàng có rỗng không
    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'Không có sản phẩm nào trong đơn hàng' });
        return;
    } else {
        // Tạo đối tượng Order mới
        const order = new Order({
            user: req.user._id, // Lấy ID người dùng từ middleware bảo vệ
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Lưu vào MongoDB
        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
};

module.exports = { addOrderItems };