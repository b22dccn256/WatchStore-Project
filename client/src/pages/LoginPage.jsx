import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Gọi API đăng nhập
            const { data } = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });

            // Đăng nhập thành công:
            console.log(data);
            // 1. Lưu thông tin user vào LocalStorage
            localStorage.setItem('userInfo', JSON.stringify(data));
            // 2. Chuyển hướng về trang chủ
            //navigate('/');
            // Thay vì navigate, ta dùng lệnh này để ép trình duyệt tải lại và về trang chủ
            // Điều này đảm bảo Header sẽ nhận diện được User mới đăng nhập
            window.location.href = '/';

        } catch (err) {
            setError('Email hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Đăng Nhập</h2>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Nhập email..."
                            required
                        />
                    </div>

                    <div className="mb-6">
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

                    <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition duration-300">
                        ĐĂNG NHẬP
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Chưa có tài khoản? <Link to="/register" className="text-amber-600 font-bold hover:underline">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;