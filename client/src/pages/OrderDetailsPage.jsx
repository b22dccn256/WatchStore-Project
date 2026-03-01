import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderDetailsPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };

                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div className="text-center py-10">Đang tải đơn hàng...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Đơn Hàng: {order._id}</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* CỘT TRÁI */}
                <div className="lg:w-2/3 space-y-6">

                    {/* 1. Thông tin giao hàng */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Giao Hàng</h2>
                        <p className="mb-2"><strong className="text-gray-600">Tên:</strong> {order.user.name}</p>
                        <p className="mb-2"><strong className="text-gray-600">Email:</strong> {order.user.email}</p>
                        <p className="mb-4">
                            <strong className="text-gray-600">Địa chỉ:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        </p>

                        {/* Trạng thái giao hàng */}
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-700 p-3 rounded">Đã giao hàng lúc {order.deliveredAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-700 p-3 rounded">Chưa giao hàng</div>
                        )}
                    </div>

                    {/* 2. Thông tin thanh toán */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Thanh Toán</h2>
                        <p className="mb-4"><strong className="text-gray-600">Phương thức:</strong> {order.paymentMethod}</p>

                        {/* Logic hiển thị QR Code nếu chọn QR */}
                        {order.paymentMethod === 'QR' && !order.isPaid && (
                            <div className="mb-4 text-center border-2 border-dashed border-amber-500 p-4 rounded bg-amber-50">
                                <p className="font-bold text-amber-700 mb-2">Quét mã để thanh toán:</p>
                                {/* Đây là ảnh QR Demo - Sau này bạn thay bằng link tạo QR động của VietQR */}
                                <img
                                    src={`https://img.vietqr.io/image/MB-662202092004-compact2.png?amount=${order.totalPrice}&addInfo=${order._id}&accountName=NGUYEN DUY HA`}
                                    alt="Mã QR Thanh Toán"
                                    className="mx-auto w-48 h-48 object-contain"
                                />
                                <p className="text-sm text-gray-500 mt-2">Nội dung CK: {order._id}</p>
                            </div>
                        )}

                        {order.isPaid ? (
                            <div className="bg-green-100 text-green-700 p-3 rounded">Đã thanh toán lúc {order.paidAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-700 p-3 rounded">Chưa thanh toán</div>
                        )}
                    </div>

                    {/* 3. Sản phẩm */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Sản phẩm</h2>
                        <div className="divide-y">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                        <Link to={`/product/${item.product}`} className="text-slate-800 hover:text-amber-600 font-medium">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="text-gray-600">
                                        {item.qty} x ${item.price} = <strong>${item.qty * item.price}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: TỔNG KẾT */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-slate-900 sticky top-4">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Tổng Cộng</h2>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between"><span>Tiền hàng:</span> <span>${order.itemsPrice}</span></div>
                            <div className="flex justify-between"><span>Phí ship:</span> <span>${order.shippingPrice}</span></div>
                            <div className="flex justify-between"><span>Thuế:</span> <span>${order.taxPrice}</span></div>
                            <hr />
                            <div className="flex justify-between text-xl font-bold text-red-600">
                                <span>Tổng:</span> <span>${order.totalPrice}</span>
                            </div>
                        </div>

                        {/* Nút giả lập thanh toán (Dùng để test) */}
                        {!order.isPaid && order.paymentMethod !== 'QR' && (
                            <button className="w-full bg-slate-900 text-white mt-6 py-3 rounded font-bold hover:bg-amber-600 transition">
                                Thanh Toán Ngay (PayPal)
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;