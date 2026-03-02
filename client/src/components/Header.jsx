import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiGrid, FiUsers, FiPackage, FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    return (
        <header className="bg-[#0c1626] text-white py-4 shadow-xl sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="text-[#d4b871] text-4xl">
                        {/* Icon hoặc Ảnh Logo */}
                        <span className="text-3xl">⌚</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-bold text-2xl text-[#d4b871] tracking-wide leading-none group-hover:text-white transition">
                            WatchStore
                        </span>
                        <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1">
                            Premium Marketplace
                        </span>
                    </div>
                </Link>

                {/* MENU GIỮA (Đã sửa theo yêu cầu) */}
                <nav className="hidden lg:flex items-center gap-8 font-sans text-[15px] font-medium tracking-wide">
                    <Link to="/" className="text-[#d4b871] hover:text-white transition relative">
                        Home
                    </Link>

                    {/* Sửa Rolex -> Products */}
                    <Link to="/" className="text-gray-300 hover:text-[#d4b871] transition">
                        Products
                    </Link>

                    {/* Sửa Hublot -> About Us */}
                    <Link to="/about" className="text-gray-300 hover:text-[#d4b871] transition">
                        About Us
                    </Link>

                    <Link to="/contact" className="text-gray-300 hover:text-[#d4b871] transition">
                        Contact
                    </Link>
                </nav>

                {/* MENU PHẢI */}
                <div className="flex items-center gap-6">
                    <form onSubmit={submitHandler} className="hidden md:flex items-center border border-[#d4b871] rounded bg-[#0f1d33] overflow-hidden h-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none text-white px-4 py-1 focus:outline-none w-40 lg:w-48 text-sm placeholder-gray-500"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="bg-[#d4b871] h-full px-4 flex items-center justify-center hover:bg-yellow-600 transition">
                            <FiSearch className="text-[#0c1626] text-lg font-bold" />
                        </button>
                    </form>

                    <div className="flex items-center gap-5">
                        {userInfo ? (
                            <div className="relative group cursor-pointer z-50">
                                <div className="flex items-center gap-2">
                                    <FaUserCircle className="text-white text-2xl hover:text-[#d4b871] transition" />
                                    <span className="hidden lg:block text-sm font-medium max-w-[100px] truncate">{userInfo.name}</span>
                                </div>

                                <div className="absolute right-0 top-full pt-4 hidden group-hover:block w-64">
                                    <div className="bg-white text-gray-800 rounded-lg shadow-2xl py-2 text-sm border border-gray-100 overflow-hidden animate-fade-in-up">
                                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                            <p className="font-bold text-[#0c1626] truncate">{userInfo.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                                        </div>

                                        {userInfo.isAdmin && (
                                            <>
                                                <div className="px-4 py-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Quản Trị Viên</div>
                                                <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff9e6] hover:text-[#d4b871] transition">
                                                    <FiGrid /> Quản lý Sản Phẩm
                                                </Link>
                                                <Link to="/admin/users" className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff9e6] hover:text-[#d4b871] transition">
                                                    <FiUsers /> Quản lý User
                                                </Link>
                                                {/* Link này trước đây chưa có trang để dẫn tới */}
                                                <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff9e6] hover:text-[#d4b871] transition">
                                                    <FiPackage /> Quản lý Đơn Hàng
                                                </Link>
                                                <div className="border-t border-gray-100 my-1"></div>
                                            </>
                                        )}

                                        {/* Link Hồ sơ & Đơn mua dẫn về cùng 1 trang Profile */}
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff9e6] hover:text-[#d4b871] transition">
                                            <FiUser /> Hồ sơ cá nhân
                                        </Link>
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-[#fff9e6] hover:text-[#d4b871] transition">
                                            <FiPackage /> Đơn mua của tôi
                                        </Link>

                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button onClick={logoutHandler} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition">
                                            <FiLogOut /> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-1 hover:text-[#d4b871] transition">
                                <FiUser className="text-xl" />
                            </Link>
                        )}

                        <Link to="/cart" className="relative group">
                            <FiShoppingCart className="text-white text-xl group-hover:text-[#d4b871] transition" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#d4b871] text-[#0c1626] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;