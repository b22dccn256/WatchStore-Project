import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate để chuyển trang
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null); // Lỗi validation (frontend)
    const [error, setError] = useState(null); // Lỗi từ API (backend)

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        // 1. Kiểm tra mật khẩu có khớp không
        if (password !== confirmPassword) {
            setMessage('Mật khẩu nhập lại không khớp!');
            return;
        } else {
            setMessage(null);
        }

        try {
            // 2. Gọi API Đăng ký
            const { data } = await axios.post('http://localhost:5000/api/users', {
                name,
                email,
                password,
            });

            // 3. Đăng ký thành công -> Tự động đăng nhập luôn
            localStorage.setItem('userInfo', JSON.stringify(data));

            // 4. Chuyển hướng về trang chủ
            window.location.href = '/';

        } catch (err) {
            // Lấy lỗi từ Backend trả về (ví dụ: Email đã tồn tại)
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Đăng Ký</h2>

                {/* Hiển thị lỗi nếu có */}
                {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Họ và Tên</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Nguyễn Văn A"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="********"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nhập lại Mật khẩu</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition duration-300">
                        ĐĂNG KÝ
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Đã có tài khoản? <Link to="/login" className="text-amber-600 font-bold hover:underline">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;