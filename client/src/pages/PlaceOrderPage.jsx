import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const PlaceOrderPage = () => {
    const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    // 1. Logic Bảo vệ: Nếu chưa có phương thức thanh toán hoặc địa chỉ thì đuổi về
    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        } else if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [paymentMethod, shippingAddress, navigate]);

    // 2. LOGIC TÍNH TOÁN TIỀN (Chuẩn E-commerce)
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

    // Tổng tiền hàng
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Phí ship: Đơn trên $500 thì Freeship, ngược lại phí $20
    const shippingPrice = itemsPrice > 500 ? 0 : 20;

    // Thuế VAT: Giả sử 8% (0.08)
    const taxPrice = 0.08 * itemsPrice;

    // Tổng thanh toán cuối cùng
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // 3. Hàm Xử lý Đặt Hàng
    // Nhớ lấy clearCart ra từ CartContext ở phía trên nhé:
    // const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);

    const placeOrderHandler = async () => {
        try {
            // 1. Lấy Token của user đang đăng nhập
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            // 2. Cấu hình Header chứa Token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // 3. Gọi API tạo đơn hàng
            const { data } = await axios.post(
                'http://localhost:5000/api/orders',
                {
                    // Map lại mảng: Giữ nguyên các trường cũ, nhưng tạo thêm trường 'product' lấy giá trị từ '_id'
                    orderItems: cartItems.map((item) => ({
                        ...item,
                        product: item._id,
                    })),
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                },
                config
            );

            // 4. Nếu thành công -> Dọn giỏ hàng và chuyển sang trang Chi tiết đơn hàng
            clearCart();
            alert('🎉 Đặt hàng thành công!');
            navigate(`/order/${data._id}`); // Chuyển hướng kèm theo ID của đơn hàng vừa tạo

        } catch (error) {
            alert(error.response && error.response.data.message
                ? error.response.data.message
                : 'Có lỗi xảy ra khi đặt hàng');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Thanh tiến trình */}
            <div className="flex justify-center mb-8 text-sm font-bold text-gray-400">
                <span className="text-gray-400">1. Giao hàng</span>
                <span className="mx-2">👉</span>
                <span className="text-gray-400">2. Thanh toán</span>
                <span className="mx-2">👉</span>
                <span className="text-amber-600">3. Chốt đơn</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
                <div className="lg:w-2/3 space-y-6">

                    {/* Box 1: Địa chỉ */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-3">
                            Thông tin giao hàng
                        </h2>
                        <p className="text-gray-700">
                            <span className="font-semibold">Địa chỉ: </span>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">SĐT: </span>
                            {shippingAddress.phone}
                        </p>
                    </div>

                    {/* Box 2: Thanh toán */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-3">
                            Phương thức thanh toán
                        </h2>
                        <p className="text-gray-700 font-medium">
                            {paymentMethod === 'QR' && '📱 Chuyển khoản QR (Online)'}
                            {paymentMethod === 'COD' && '🚚 Thanh toán khi nhận hàng (COD)'}
                            {paymentMethod === 'PayPal' && '💳 PayPal / Thẻ Tín Dụng'}
                        </p>
                    </div>

                    {/* Box 3: Danh sách sản phẩm */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-3">
                            Sản phẩm trong đơn
                        </h2>
                        {cartItems.length === 0 ? (
                            <div className="text-red-500">Giỏ hàng của bạn đang trống!</div>
                        ) : (
                            <div className="divide-y">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <Link to={`/product/${item._id}`} className="font-bold text-slate-800 hover:text-amber-600">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="font-medium text-gray-700">
                                            {item.qty} x ${item.price} = <span className="font-bold text-slate-900">${addDecimals(item.qty * item.price)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* CỘT PHẢI: BẢNG TÍNH TIỀN TỔNG KẾT */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-slate-900 sticky top-24">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 text-center uppercase">
                            Tổng Kết Đơn Hàng
                        </h2>

                        <div className="space-y-4 text-gray-700">
                            <div className="flex justify-between">
                                <span>Tiền hàng:</span>
                                <span className="font-medium">${addDecimals(itemsPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span className="font-medium">${addDecimals(shippingPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Thuế (8%):</span>
                                <span className="font-medium">${addDecimals(taxPrice)}</span>
                            </div>

                            <hr className="my-2" />

                            <div className="flex justify-between text-xl font-bold text-slate-900">
                                <span>TỔNG CỘNG:</span>
                                <span className="text-red-600">${addDecimals(totalPrice)}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={cartItems.length === 0}
                            onClick={placeOrderHandler}
                            className={`w-full mt-8 py-3 rounded-lg font-bold text-white transition shadow-md ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'
                                }`}
                        >
                            CHỐT ĐƠN HÀNG
                        </button>

                        {paymentMethod === 'QR' && (
                            <div className="mt-4 text-sm text-center text-blue-600 bg-blue-50 p-2 rounded">
                                ℹ️ Mã QR sẽ được tạo sau khi bạn bấm Chốt Đơn.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;