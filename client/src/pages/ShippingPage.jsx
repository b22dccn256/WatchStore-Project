import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ShippingPage = () => {
    const { shippingAddress, saveShippingAddress } = useContext(CartContext);
    const navigate = useNavigate();

    // Khởi tạo state từ dữ liệu đã lưu (nếu có) để form tự điền lại
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const submitHandler = (e) => {
        e.preventDefault();

        // Lưu vào Context & LocalStorage
        saveShippingAddress({ address, city, postalCode, phone });

        // Chuyển sang bước chọn phương thức thanh toán (sẽ làm tiếp theo)
        navigate('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">

                {/* Thanh tiến trình đơn giản (Breadcrumb) */}
                <div className="flex justify-center mb-8 text-sm font-bold text-gray-400">
                    <span className="text-amber-600">1. Giao hàng</span>
                    <span className="mx-2">👉</span>
                    <span>2. Thanh toán</span>
                    <span className="mx-2">👉</span>
                    <span>3. Chốt đơn</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-amber-500 pl-3">
                    Địa chỉ giao hàng
                </h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Số nhà, Tên đường</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="Ví dụ: 96A Trần Phú..."
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Thành phố / Tỉnh</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="Hà Nội"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Mã bưu điện (Zip Code)</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="100000"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại nhận hàng</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="0987654321"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition shadow-md"
                    >
                        TIẾP TỤC THANH TOÁN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;