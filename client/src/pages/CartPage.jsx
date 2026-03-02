import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { FiTrash2, FiMinus, FiPlus, FiCreditCard } from 'react-icons/fi';
import { FaQrcode, FaMoneyBillWave } from 'react-icons/fa';

const CartPage = () => {
    const { cartItems, removeFromCart, updateCartQty } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login?redirect=shipping');
        } else {
            navigate('/shipping');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shippingFee = 0;
    const total = subtotal + shippingFee;

    return (
        <div className="bg-[#f8f9fa] min-h-screen py-10 font-sans">
            {/* 👇 THAY ĐỔI Ở ĐÂY: Dùng max-w-7xl và mx-auto để căn giữa tuyệt đối */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Tiêu đề trang */}
                <h1 className="text-3xl font-serif font-bold text-[#0c1626] mb-8 uppercase tracking-wide border-l-4 border-[#d4b871] pl-4">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-10 rounded-lg shadow-sm text-center border border-gray-100 max-w-2xl mx-auto">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn đang trống</h2>
                        <p className="text-gray-500 mb-6">Hãy khám phá thêm các mẫu đồng hồ tuyệt vời của chúng tôi.</p>
                        <Link to="/" className="inline-block bg-[#0c1626] text-white px-8 py-3 rounded hover:bg-[#d4b871] hover:text-[#0c1626] transition font-bold uppercase tracking-wider">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 justify-center"> {/* Thêm justify-center */}

                        {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM (Chiếm 70% chiều rộng) */}
                        <div className="lg:w-[70%]">
                            <div className="bg-white rounded-lg shadow-card overflow-hidden border border-gray-100">
                                {/* Header bảng */}
                                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#0c1626] text-white font-bold text-sm uppercase tracking-wider">
                                    <div className="col-span-6">Sản Phẩm</div>
                                    <div className="col-span-2 text-center">Giá</div>
                                    <div className="col-span-3 text-center">Số Lượng</div>
                                    <div className="col-span-1 text-center">Xóa</div>
                                </div>

                                {/* Danh sách items */}
                                <div className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition">

                                            {/* Ảnh & Tên */}
                                            <div className="col-span-6 flex items-center gap-4 w-full">
                                                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <Link to={`/product/${item._id}`} className="text-[#0c1626] font-bold font-serif text-lg hover:text-[#d4b871] transition line-clamp-2">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                                                </div>
                                            </div>

                                            {/* Giá */}
                                            <div className="col-span-2 text-center w-full md:w-auto flex justify-between md:block px-4 md:px-0">
                                                <span className="md:hidden font-bold text-gray-500">Giá:</span>
                                                <span className="text-[#d4b871] font-bold text-lg">{formatCurrency(item.price)}</span>
                                            </div>

                                            {/* Số lượng */}
                                            <div className="col-span-3 flex justify-center w-full md:w-auto my-2 md:my-0">
                                                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                                    <button
                                                        onClick={() => updateCartQty(item._id, item.qty - 1)}
                                                        disabled={item.qty <= 1}
                                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-200 disabled:opacity-50 transition text-gray-600"
                                                    >
                                                        <FiMinus size={14} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={item.qty}
                                                        className="w-10 text-center text-sm font-bold text-[#0c1626] focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => updateCartQty(item._id, item.qty + 1)}
                                                        disabled={item.qty >= item.countInStock}
                                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-200 disabled:opacity-50 transition text-gray-600"
                                                    >
                                                        <FiPlus size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Nút Xóa */}
                                            <div className="col-span-1 text-center w-full md:w-auto mt-2 md:mt-0">
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50"
                                                    title="Xóa khỏi giỏ"
                                                >
                                                    <FiTrash2 size={20} />
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link to="/" className="text-gray-500 hover:text-[#0c1626] font-medium flex items-center gap-2 transition group">
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Tiếp tục xem sản phẩm
                                </Link>
                            </div>
                        </div>

                        {/* CỘT PHẢI: ORDER SUMMARY (Chiếm 30% chiều rộng) */}
                        <div className="lg:w-[30%]">
                            <div className="bg-white p-6 rounded-lg shadow-card border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-serif font-bold text-[#0c1626] mb-6 border-b border-gray-100 pb-4">
                                    ORDER SUMMARY
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính (Subtotal):</span>
                                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển:</span>
                                        <span className="text-green-600 font-medium">Miễn phí</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                                        <span className="font-bold text-lg text-[#0c1626]">TỔNG CỘNG:</span>
                                        <span className="font-bold text-xl text-[#d4b871]">{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Phương thức thanh toán</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="border border-[#d4b871] bg-[#fff9e6] rounded p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition">
                                            <FaQrcode className="text-[#0c1626] text-xl mb-1" />
                                            <span className="text-[9px] font-bold text-gray-700">QR Code</span>
                                        </div>
                                        <div className="border border-gray-200 rounded p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#d4b871] hover:bg-[#fff9e6] transition opacity-60">
                                            <FaMoneyBillWave className="text-gray-600 text-xl mb-1" />
                                            <span className="text-[9px] font-bold text-gray-600">Tiền mặt</span>
                                        </div>
                                        <div className="border border-gray-200 rounded p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#d4b871] hover:bg-[#fff9e6] transition opacity-60">
                                            <FiCreditCard className="text-gray-600 text-xl mb-1" />
                                            <span className="text-[9px] font-bold text-gray-600">Thẻ Visa</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={checkoutHandler}
                                    className="w-full bg-[#d4b871] text-white font-bold py-4 rounded uppercase tracking-wider shadow-md hover:bg-yellow-600 hover:shadow-lg transition transform active:scale-[0.98]"
                                >
                                    TIẾN HÀNH THANH TOÁN
                                </button>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Mã Giảm Giá</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Nhập mã..."
                                            className="flex-grow border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#d4b871]"
                                        />
                                        <button className="bg-[#0c1626] text-white px-4 py-2 rounded text-xs font-bold uppercase hover:bg-gray-800 transition">
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;