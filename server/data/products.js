const products = [
    {
        name: 'Rolex Submariner Date',
        image: '/images/rolex-sub.jpg', // Đường dẫn ảnh (sẽ xử lý sau)
        description: 'Đồng hồ lặn kinh điển, chống nước siêu việt.',
        brand: 'Rolex',
        category: 'Automatic',
        price: 10500,
        countInStock: 5, // Logic: Còn 5 cái
        rating: 5,
        numReviews: 12,
        specs: {
            diameter: 41,
            waterResistant: '30ATM',
            material: 'Oystersteel'
        }
    },
    {
        name: 'Casio G-Shock GA-2100',
        image: '/images/casio-ga2100.jpg',
        description: 'Thiết kế bát giác, siêu bền bỉ, chống sốc.',
        brand: 'Casio',
        category: 'Sport',
        price: 120,
        countInStock: 50, // Hàng đại trà, tồn kho nhiều
        rating: 4.5,
        numReviews: 45,
        specs: {
            diameter: 45,
            waterResistant: '20ATM',
            material: 'Resin'
        }
    },
    {
        name: 'Apple Watch Series 9',
        image: '/images/apple-w9.jpg',
        description: 'Đồng hồ thông minh, đo oxy trong máu.',
        brand: 'Apple',
        category: 'Smartwatch',
        price: 399,
        countInStock: 0, // Logic: Hết hàng (để test chức năng chặn mua)
        rating: 4.8,
        numReviews: 20,
        specs: {
            diameter: 45,
            waterResistant: '5ATM',
            material: 'Aluminum'
        }
    },
    // Bạn có thể copy thêm sản phẩm tùy thích...
];

module.exports = products;