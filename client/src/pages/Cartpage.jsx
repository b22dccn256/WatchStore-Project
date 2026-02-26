import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Logic tính tổng tiền: Cộng dồn (Giá * Số lượng) của từng món
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Xử lý thay đổi số lượng
    const handleQuantityChange = (product, newQty) => {
        if (newQty > 0 && newQty <= product.countInStock) {
            addToCart(product, newQty); // Cập nhật lại số lượng trong Context
        }
    };

    const checkoutHandler = () => {
        // Logic: Kiểm tra đăng nhập (sẽ làm ở Giai đoạn 3)
        // Tạm thời chuyển hướng sang trang đăng nhập
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 border-l-4 border-amber-500 pl-3">
                Giỏ Hàng Của Bạn
            </h1>

            {cartItems.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <h2 className="text-xl text-gray-600 mb-4">Giỏ hàng đang trống!</h2>
                    <Link to="/" className="inline-block bg-slate-900 text-white px-6 py-3 rounded hover:bg-amber-600 transition">
                        ← Quay lại mua sắm
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">

                    {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
                    <div className="md:w-2/3">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition">
                                    {/* Ảnh & Tên */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <Link to={`/product/${item._id}`} className="font-bold text-slate-800 hover:text-amber-600">
                                                {item.name}
                                            </Link>
                                            <div className="text-sm text-gray-500">{item.brand}</div>
                                        </div>
                                    </div>

                                    {/* Giá tiền */}
                                    <div className="w-24 font-bold text-slate-700">${item.price}</div>

                                    {/* Bộ chỉnh số lượng */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(item, item.qty - 1)}
                                            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.qty}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item, item.qty + 1)}
                                            disabled={item.qty >= item.countInStock}
                                            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="ml-4 text-red-500 hover:text-red-700 p-2"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CỘT PHẢI: TỔNG TIỀN & THANH TOÁN */}
                    <div className="md:w-1/3 h-fit sticky top-24">
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase text-center">
                                Thông tin đơn hàng
                            </h2>

                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Số lượng:</span>
                                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)} sản phẩm</span>
                            </div>

                            <div className="flex justify-between mb-6 text-xl font-bold text-slate-900 border-t pt-4">
                                <span>Tạm tính:</span>
                                <span className="text-red-600">${totalAmount.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-slate-900 text-white py-3 rounded font-bold hover:bg-amber-600 transition shadow-lg"
                            >
                                TIẾN HÀNH THANH TOÁN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;