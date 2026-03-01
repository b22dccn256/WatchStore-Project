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

// @desc    Xóa một sản phẩm
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id }); // Lệnh xóa trong MongoDB
        res.json({ message: 'Đã xóa sản phẩm thành công' });
    } else {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
};

// @desc    Tạo một sản phẩm mẫu
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const product = new Product({
        name: 'Tên sản phẩm mẫu',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Thương hiệu mẫu',
        category: 'Danh mục mẫu',
        countInStock: 0,
        numReviews: 0,
        description: 'Mô tả mẫu',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Cập nhật thông tin sản phẩm
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
};