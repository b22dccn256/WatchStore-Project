import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency, formatDate } from '../utils/format'; // <--- Import hàm format

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 👇 FIX LỖI Ở ĐÂY: Lấy thông tin User để check quyền Admin
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchOrder = async () => {
            try {
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

        if (userInfo) {
            fetchOrder();
        }
    }, [id]); // Bỏ userInfo ra khỏi dependency để tránh loop vô tận nếu object thay đổi

    const deliverHandler = async () => {
        if (!window.confirm('Xác nhận đơn hàng này đã được giao?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`http://localhost:5000/api/orders/${id}/deliver`, {}, config);
            alert('Cập nhật thành công!');
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="text-center py-10 font-bold text-gray-500">Đang tải đơn hàng...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-2xl font-bold text-primary mb-6 font-serif">
                Đơn Hàng: <span className="text-gray-500 text-lg font-mono">#{order._id}</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
                <div className="lg:w-2/3 space-y-6">

                    {/* 1. Giao Hàng & Thanh Toán (Giao diện Badge mới) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Thẻ Giao Hàng */}
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-bold text-primary mb-3 border-b pb-2">Giao Hàng</h2>
                            <p className="text-gray-600 mb-1"><strong>Tên:</strong> {order.user.name}</p>
                            <p className="text-gray-600 mb-1"><strong>Email:</strong> {order.user.email}</p>
                            <p className="text-gray-600 mb-4">
                                <strong>Địa chỉ:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}
                            </p>

                            {order.isDelivered ? (
                                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                    ✅ Đã giao: {formatDate(order.deliveredAt)}
                                </span>
                            ) : (
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">
                                    ⏳ Chưa giao hàng
                                </span>
                            )}
                        </div>

                        {/* Thẻ Thanh Toán */}
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-bold text-primary mb-3 border-b pb-2">Thanh Toán</h2>
                            <p className="text-gray-600 mb-4"><strong>Phương thức:</strong> {order.paymentMethod}</p>

                            {order.isPaid ? (
                                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                    ✅ Đã thanh toán: {formatDate(order.paidAt)}
                                </span>
                            ) : (
                                <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                                    ❌ Chưa thanh toán
                                </span>
                            )}
                        </div>
                    </div>

                    {/* 2. Sản Phẩm */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-primary mb-4 border-b pb-2">Sản Phẩm Đã Mua</h2>
                        <div className="divide-y divide-gray-100">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                                        <Link to={`/product/${item.product}`} className="text-primary font-medium hover:text-accent transition">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="text-gray-600 font-mono text-sm">
                                        {item.qty} x {formatCurrency(item.price)} = <strong className="text-gray-900">{formatCurrency(item.qty * item.price)}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: TỔNG KẾT & ACTION */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-4">
                        <h2 className="text-xl font-bold text-center text-primary mb-6 font-serif">Tổng Cộng</h2>

                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between"><span>Tiền hàng:</span> <span>{formatCurrency(order.itemsPrice)}</span></div>
                            <div className="flex justify-between"><span>Phí ship:</span> <span>{formatCurrency(order.shippingPrice)}</span></div>
                            <div className="flex justify-between"><span>Thuế:</span> <span>{formatCurrency(order.taxPrice)}</span></div>
                            <div className="border-t pt-3 mt-3 flex justify-between text-xl font-bold text-accent">
                                <span>Tổng tiền:</span> <span>{formatCurrency(order.totalPrice)}</span>
                            </div>
                        </div>

                        {/* QR Code thanh toán (Chỉ hiện khi chưa trả tiền & chọn QR) */}
                        {!order.isPaid && order.paymentMethod === 'QR' && (
                            <div className="mt-6 text-center bg-gray-50 p-4 rounded border border-dashed border-gray-300">
                                <p className="font-bold text-gray-700 mb-2 text-sm">Quét mã để thanh toán:</p>
                                <img
                                    src={`https://img.vietqr.io/image/MB-0362145322-compact2.png?amount=${order.totalPrice}&addInfo=${order._id}&accountName=NGUYEN DUY HA`}
                                    alt="QR Code"
                                    className="mx-auto w-40 h-40 object-contain mix-blend-multiply"
                                />
                            </div>
                        )}

                        {/* Nút Admin Giao Hàng */}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <button
                                onClick={deliverHandler}
                                className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent transition duration-300 shadow-lg"
                            >
                                ĐÁNH DẤU ĐÃ GIAO HÀNG 🚚
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;