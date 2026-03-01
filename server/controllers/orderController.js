const Order = require('../models/Order');
const Product = require('../models/Product');

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

        // --- 2. LOGIC TRỪ TỒN KHO (Inventory Management) ---
        // Duyệt qua từng sản phẩm trong đơn hàng vừa tạo
        for (const item of orderItems) {
            // Tìm sản phẩm trong DB
            const product = await Product.findById(item.product);

            if (product) {
                // Trừ số lượng tồn kho = Số hiện tại - Số khách mua
                product.countInStock = product.countInStock - item.qty;

                // Lưu lại sản phẩm đã cập nhật
                await product.save();
            }
        }
        // ---------------------------------------------------

        res.status(201).json(createdOrder);
    }
};

// @desc    Lấy chi tiết 1 đơn hàng theo ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    // Tìm đơn hàng trong DB và "populate" (nối bảng) để lấy thêm tên và email của người mua
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
};

// @desc    Lấy danh sách đơn hàng của người dùng đang đăng nhập
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    // Tìm đơn hàng có user trùng với id người đang đăng nhập
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

module.exports = { addOrderItems, getOrderById, getMyOrders };