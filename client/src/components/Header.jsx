import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // 1. Lấy thông tin user từ LocalStorage
    const [userInfo, setUserInfo] = useState(null);

    // Dùng useEffect để đọc dữ liệu khi Header vừa hiện ra
    useEffect(() => {
        const userFromStorage = localStorage.getItem('userInfo');
        if (userFromStorage) {
            setUserInfo(JSON.parse(userFromStorage));
        }
    }, []);

    // 2. Hàm Đăng Xuất
    const logoutHandler = () => {
        localStorage.removeItem('userInfo'); // Xóa user khỏi bộ nhớ
        setUserInfo(null); // Cập nhật lại State để giao diện đổi ngay lập tức
        navigate('/login'); // Đá về trang đăng nhập
    };

    return (
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-amber-500 flex items-center gap-2">
                    <span>⌚</span> WatchStore
                </Link>

                <nav className="hidden md:flex space-x-8 font-medium">
                    <Link to="/" className="hover:text-amber-400 transition">Trang Chủ</Link>
                    <Link to="/about" className="hover:text-amber-400 transition">Giới Thiệu</Link>
                </nav>

                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative group">
                        <span className="text-2xl">🛒</span>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {/* 3. LOGIC HIỂN THỊ CÓ ĐIỀU KIỆN */}
                    {userInfo ? (
                        // Nếu ĐÃ đăng nhập
                        <div className="flex items-center gap-4">
                            <span className="text-amber-400 font-bold">Hi, {userInfo.name}</span>
                            <button
                                onClick={logoutHandler}
                                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                            >
                                Đăng Xuất
                            </button>
                        </div>
                    ) : (
                        // Nếu CHƯA đăng nhập
                        <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-md font-bold transition">
                            Đăng Nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;