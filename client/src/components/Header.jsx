import { Link } from 'react-router-dom';

const Header = () => {
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
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
                    </Link>
                    <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-md font-bold transition">Đăng Nhập</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;