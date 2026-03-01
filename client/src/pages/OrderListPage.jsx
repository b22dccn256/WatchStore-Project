import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const OrderListPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        } else {
            const fetchOrders = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    };
                    const { data } = await axios.get('http://localhost:5000/api/orders', config);
                    setOrders(data);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [navigate]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 uppercase">Quản lý Đơn Hàng</h1>

            {loading ? (
                <div>Đang tải...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="p-4">MÃ ĐƠN</th>
                                <th className="p-4">KHÁCH HÀNG</th>
                                <th className="p-4">NGÀY ĐẶT</th>
                                <th className="p-4">TỔNG TIỀN</th>
                                <th className="p-4">THANH TOÁN</th>
                                <th className="p-4">GIAO HÀNG</th>
                                <th className="p-4">CHI TIẾT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="p-4 font-mono text-xs">{order._id}</td>
                                    <td className="p-4 font-medium">{order.user && order.user.name}</td>
                                    <td className="p-4">{order.createdAt.substring(0, 10)}</td>
                                    <td className="p-4">${order.totalPrice}</td>
                                    <td className="p-4">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-bold">✔ {order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            <span className="text-red-600">✖ Chưa</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-bold">✔ {order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            <span className="text-red-600">✖ Chưa</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Link to={`/order/${order._id}`} className="bg-slate-200 px-3 py-1 rounded text-sm hover:bg-slate-300">
                                            Xem
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListPage;