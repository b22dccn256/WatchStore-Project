import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy thông tin user từ LocalStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            const fetchMyOrders = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    };
                    const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                    setOrders(data);
                    setLoading(false);
                } catch (err) {
                    setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                    setLoading(false);
                }
            };
            fetchMyOrders();
        }
    }, [navigate, userInfo]);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-10">

                {/* CỘT TRÁI: THÔNG TIN USER */}
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-bold mb-5 text-slate-800">Thông tin cá nhân</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tên hiển thị</label>
                            <input type="text" value={userInfo?.name} disabled className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" value={userInfo?.email} disabled className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed" />
                        </div>
                        <p className="text-sm text-gray-500 italic">* Tính năng đổi mật khẩu đang xây dựng</p>
                    </div>
                </div>

                {/* CỘT PHẢI: LỊCH SỬ ĐƠN HÀNG */}
                <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-5 text-slate-800">Lịch sử đơn hàng</h2>
                    {loading ? (
                        <div>Đang tải...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-900 text-white uppercase font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Mã Đơn</th>
                                        <th className="px-4 py-3">Ngày đặt</th>
                                        <th className="px-4 py-3">Tổng tiền</th>
                                        <th className="px-4 py-3">Thanh toán</th>
                                        <th className="px-4 py-3">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 font-mono text-xs">{order._id.substring(0, 10)}...</td>
                                            <td className="px-4 py-3">{order.createdAt.substring(0, 10)}</td>
                                            <td className="px-4 py-3 font-bold">${order.totalPrice}</td>
                                            <td className="px-4 py-3">
                                                {order.isPaid ? (
                                                    <span className="text-green-600 font-bold">Đã xong</span>
                                                ) : (
                                                    <span className="text-red-600 font-bold">Chưa (QR/COD)</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link to={`/order/${order._id}`} className="bg-amber-500 text-white px-3 py-1 rounded text-xs hover:bg-amber-600">
                                                    Xem
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && <div className="p-4 text-center text-gray-500">Bạn chưa có đơn hàng nào.</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;