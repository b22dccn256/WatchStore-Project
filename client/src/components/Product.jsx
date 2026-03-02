import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format'; // Nhớ import hàm format tiền
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Product = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    // Xử lý khi ảnh bị lỗi -> Hiện ảnh đồng hồ mặc định
    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/400x400/png?text=Watch+Store';
    };

    const addToCartHandler = (e) => {
        e.preventDefault(); // Chặn việc click vào Link
        addToCart(product, 1);
        alert('Đã thêm vào giỏ hàng!');
    };

    return (
        <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 
        border border-gray-100 flex flex-col h-full group overflow-hidden relative">

            {/* 1. Phần Ảnh Sản Phẩm */}
            <Link to={`/product/${product._id}`} className="block relative h-52 overflow-hidden bg-white p-4">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={handleImageError}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />

                {/* Nhãn "New" (Optional) */}
                <div className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
                    New
                </div>
            </Link>

            {/* 2. Phần Thông Tin */}
            <div className="p-4 text-center flex-grow flex flex-col justify-between">
                <div>
                    <Link to={`/product/${product._id}`}>
                        <h3 className="font-serif font-bold text-gray-800 text-base mb-2 hover:text-accent transition truncate px-2">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Giá tiền màu Vàng Gold */}
                    <p className="text-accent font-bold text-lg mb-4 font-sans">
                        {formatCurrency(product.price)}
                    </p>
                </div>

                {/* 3. Nút Add To Cart (Style chuẩn mẫu) */}
                <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`w-full py-2 rounded text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md
                ${product.countInStock > 0
                            ? "bg-accent text-white hover:bg-yellow-600 hover:shadow-lg"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    {product.countInStock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
            </div>
        </div>
    );
};

export default Product;