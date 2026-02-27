import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const PaymentPage = () => {
    const { shippingAddress, paymentMethod, savePaymentMethod } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    // Sửa giá trị mặc định thành QR (hoặc giữ PayPal tuỳ bạn)
    const [paymentMethodState, setPaymentMethodState] = useState(paymentMethod || 'QR');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethodState);
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">

                <div className="flex justify-center mb-8 text-sm font-bold text-gray-400">
                    <span className="text-gray-400">1. Giao hàng</span>
                    <span className="mx-2">👉</span>
                    <span className="text-amber-600">2. Thanh toán</span>
                    <span className="mx-2">👉</span>
                    <span>3. Chốt đơn</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-amber-500 pl-3">
                    Phương thức thanh toán
                </h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-6 flex flex-col gap-4"> {/* Đổi thành flex-col và thêm gap cho các nút cách đều nhau */}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Chọn phương thức bạn muốn sử dụng:
                        </label>

                        {/* Tùy chọn 1: QR Online (MỚI THÊM) */}
                        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="radio"
                                id="QR"
                                name="paymentMethod"
                                value="QR"
                                checked={paymentMethodState === 'QR'}
                                onChange={(e) => setPaymentMethodState(e.target.value)}
                                className="w-5 h-5 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <label htmlFor="QR" className="ml-3 font-medium text-slate-700 cursor-pointer flex-1 flex items-center gap-2">
                                <span>📱</span> Thanh toán chuyển khoản QR (Online)
                            </label>
                        </div>

                        {/* Tùy chọn 2: COD */}
                        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="radio"
                                id="COD"
                                name="paymentMethod"
                                value="COD"
                                checked={paymentMethodState === 'COD'}
                                onChange={(e) => setPaymentMethodState(e.target.value)}
                                className="w-5 h-5 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <label htmlFor="COD" className="ml-3 font-medium text-slate-700 cursor-pointer flex-1 flex items-center gap-2">
                                <span>🚚</span> Thanh toán khi nhận hàng (COD)
                            </label>
                        </div>

                        {/* Tùy chọn 3: PayPal */}
                        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="radio"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethodState === 'PayPal'}
                                onChange={(e) => setPaymentMethodState(e.target.value)}
                                className="w-5 h-5 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <label htmlFor="PayPal" className="ml-3 font-medium text-slate-700 cursor-pointer flex-1 flex items-center gap-2">
                                <span>💳</span> PayPal hoặc Thẻ Quốc Tế
                            </label>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition shadow-md"
                    >
                        TIẾP TỤC ĐẾN CHỐT ĐƠN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;