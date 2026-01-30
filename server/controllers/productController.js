const Product = require('../models/Product');

// @desc    Lấy tất cả sản phẩm
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Lấy tất cả, không lọc
        res.json(products); // Trả về dạng JSON
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server: Không lấy được danh sách sản phẩm' });
    }
};

// @desc    Lấy 1 sản phẩm theo ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        // Lỗi này thường do ID không đúng định dạng MongoDB
        res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
};

module.exports = {
    getProducts,
    getProductById
};