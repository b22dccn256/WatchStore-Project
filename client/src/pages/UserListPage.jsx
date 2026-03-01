import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserListPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        // 1. Logic bảo vệ: Nếu không phải Admin thì đuổi về trang chủ
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
            return; // Dừng chạy tiếp
        }

        const fetchUsers = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                // Gọi API lấy danh sách User
                const { data } = await axios.get('http://localhost:5000/api/users', config);
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]); // Bỏ userInfo ra khỏi dependency để tránh loop, chỉ check trong hàm

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 uppercase">Quản lý Người Dùng</h1>

            {loading ? (
                <div>Đang tải danh sách...</div>
            ) : error ? (
                <div className="text-red-500 bg-red-100 p-3 rounded">{error}</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">TÊN</th>
                                <th className="p-4">EMAIL</th>
                                <th className="p-4">QUYỀN ADMIN</th>
                                <th className="p-4">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="p-4 font-mono text-xs">{user._id}</td>
                                    <td className="p-4 font-medium">{user.name}</td>
                                    <td className="p-4"><a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a></td>
                                    <td className="p-4">
                                        {user.isAdmin ? (
                                            <span className="text-green-600 font-bold">✔ Admin</span>
                                        ) : (
                                            <span className="text-gray-400">✖ User</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50" disabled={user.isAdmin}>
                                            Xóa
                                        </button>
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

export default UserListPage;