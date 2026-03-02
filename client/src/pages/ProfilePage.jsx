import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency, formatDate } from '../utils/format';
import {
    FiUser, FiShoppingBag, FiMapPin, FiHeart, FiLogOut,
    FiSettings, FiCamera, FiEdit2, FiShield, FiLock, FiCheckCircle,
    FiBell, FiAlertTriangle, FiMail, FiPhone, FiCalendar, FiFlag
} from 'react-icons/fi';

const ProfilePage = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // --- STATE QUẢN LÝ ---
    const [activeTab, setActiveTab] = useState('dashboard');

    // State dữ liệu form (Bổ sung thêm các trường mới)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');        // Mới
    const [dob, setDob] = useState('');            // Mới
    const [gender, setGender] = useState('male');  // Mới
    const [nationality, setNationality] = useState('Vietnam'); // Mới

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State thông báo
    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // State đơn hàng
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Avatar Initials
    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        const names = fullName.split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            // Load dữ liệu từ userInfo vào form
            setName(userInfo.name || '');
            setEmail(userInfo.email || '');
            setPhone(userInfo.phone || ''); // Nếu backend chưa có thì để trống
            setDob(userInfo.dob || '');
            setGender(userInfo.gender || 'male');
            setNationality(userInfo.nationality || 'Vietnam');

            getMyOrders();
        }
    }, [navigate]);

    const getMyOrders = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
            setOrders(data);
            setLoadingOrders(false);
        } catch (error) {
            console.error(error);
            setLoadingOrders(false);
        }
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Mật khẩu mới không khớp');
            setSuccessMessage(null);
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            // Gửi toàn bộ dữ liệu mới lên Server
            const { data } = await axios.put(
                'http://localhost:5000/api/users/profile',
                { name, email, password, phone, dob, gender, nationality },
                config
            );

            // Cập nhật lại LocalStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

            setSuccessMessage('Cập nhật hồ sơ thành công!');
            setMessage(null);
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setSuccessMessage(null);
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    // Tính tổng chi tiêu
    const totalSpent = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

    // --- SUB-COMPONENTS ---
    const MenuItem = ({ icon: Icon, label, tabName }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 
        ${activeTab === tabName
                    ? 'bg-[#0f172a] text-white shadow-lg shadow-[#0f172a]/20 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0f172a]'}`}
        >
            <Icon className={activeTab === tabName ? 'text-[#d4af37]' : 'text-slate-400'} size={20} />
            <span className="text-sm">{label}</span>
        </button>
    );

    const ToggleSwitch = ({ label, description, defaultChecked }) => (
        <div className="flex items-center justify-between py-4 border-t border-slate-50 first:border-0">
            <div className="flex flex-col pr-4">
                <span className="font-medium text-[#0f172a] text-sm">{label}</span>
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]"></div>
            </label>
        </div>
    );

    // --- RENDER CONTENT ---
    return (
        <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans text-slate-900">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* === SIDEBAR === */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-28 space-y-2">
                            <div className="px-4 py-2 mb-2">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Menu Quản Lý</h3>
                            </div>
                            <MenuItem icon={FiUser} label="Hồ Sơ Cá Nhân" tabName="dashboard" />
                            <MenuItem icon={FiShoppingBag} label="Lịch Sử Đơn Hàng" tabName="orders" />
                            <MenuItem icon={FiSettings} label="Cài Đặt Tài Khoản" tabName="settings" />
                            <div className="my-4 border-t border-slate-100"></div>
                            <button onClick={logoutHandler} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                                <FiLogOut size={20} />
                                <span className="text-sm font-medium">Đăng Xuất</span>
                            </button>
                        </div>
                    </aside>

                    {/* === MAIN CONTENT === */}
                    <div className="flex-1 space-y-8">

                        {/* A. DASHBOARD (VIEW ONLY) */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Header Card */}
                                <div className="relative bg-white rounded-2xl shadow-sm p-8 overflow-hidden border border-slate-100">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                                        <div className="relative shrink-0">
                                            <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl bg-[#0f172a] flex items-center justify-center text-3xl font-serif font-bold text-[#d4af37]">
                                                {getInitials(name)}
                                            </div>
                                            <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-[#0f172a] shadow-md border-2 border-white">
                                                <FiCheckCircle size={14} />
                                            </div>
                                        </div>
                                        <div className="text-center md:text-left flex-1">
                                            <h2 className="text-2xl font-serif font-bold text-[#0f172a] mb-2">Xin chào, {name}!</h2>
                                            <p className="text-slate-500 text-sm mb-4">Chào mừng bạn quay trở lại. Bạn đang là thành viên <span className="text-[#d4af37] font-bold">Gold Member</span>.</p>
                                            <div className="w-full max-w-md bg-slate-100 rounded-full h-2 mb-2">
                                                <div className="bg-[#d4af37] h-2 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                            <p className="text-xs text-slate-400">Chi tiêu thêm <strong>15.000.000 ₫</strong> để nâng hạng Platinum.</p>
                                        </div>
                                        <button onClick={() => setActiveTab('settings')} className="shrink-0 px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-[#d4af37] hover:text-[#d4af37] transition bg-white">
                                            <FiEdit2 className="inline mr-2" /> Chỉnh Sửa
                                        </button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-lg shadow-[#0f172a]/20 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#d4af37]"><FiShoppingBag size={24} /></div>
                                        <div><p className="text-xs text-slate-300 uppercase tracking-wider font-bold">Tổng Đơn Hàng</p><p className="text-2xl font-bold font-serif">{orders.length}</p></div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#fff9e6] rounded-full flex items-center justify-center text-[#d4af37]"><span className="font-serif font-bold text-xl">₫</span></div>
                                        <div><p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Tổng Chi Tiêu</p><p className="text-xl font-bold text-[#0f172a]">{formatCurrency(totalSpent)}</p></div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#fff9e6] rounded-full flex items-center justify-center text-[#d4af37]"><FiHeart size={24} /></div>
                                        <div><p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Điểm Thưởng</p><p className="text-xl font-bold text-[#0f172a]">1,250 Pts</p></div>
                                    </div>
                                </div>

                                {/* INFO GRID (VIEW ONLY) */}
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                                        <h3 className="font-bold text-[#0f172a] flex items-center gap-2"><FiUser className="text-[#d4af37]" /> Thông Tin Cá Nhân</h3>
                                    </div>
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                        <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Họ và Tên</p><p className="font-medium text-[#0f172a] text-lg">{name}</p></div>
                                        <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Email</p><p className="font-medium text-[#0f172a] text-lg">{email}</p></div>
                                        <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Số điện thoại</p><p className="font-medium text-[#0f172a] text-lg">{phone || "Chưa cập nhật"}</p></div>
                                        <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Ngày Sinh</p><p className="font-medium text-[#0f172a] text-lg">{dob || "Chưa cập nhật"}</p></div>
                                        <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Giới tính</p><p className="font-medium text-[#0f172a] text-lg capitalize">{gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác'}</p></div>
                                        <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Quốc tịch</p><p className="font-medium text-[#0f172a] text-lg flex items-center gap-2">{nationality}</p></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* B. ORDERS (LIST) */}
                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-in border border-slate-100">
                                <h2 className="text-xl font-serif font-bold text-[#0f172a] mb-6">Lịch Sử Mua Sắm</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
                                            <tr>
                                                <th className="px-6 py-4">Mã Đơn</th>
                                                <th className="px-6 py-4">Ngày Đặt</th>
                                                <th className="px-6 py-4">Tổng Tiền</th>
                                                <th className="px-6 py-4">Trạng Thái</th>
                                                <th className="px-6 py-4 text-right">Chi Tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {orders.length === 0 ? (
                                                <tr><td colSpan="5" className="text-center py-10 text-slate-500">Chưa có đơn hàng nào.</td></tr>
                                            ) : orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-slate-50 transition">
                                                    <td className="px-6 py-4 font-mono font-medium">#{order._id.substring(0, 8).toUpperCase()}</td>
                                                    <td className="px-6 py-4 text-slate-500">{formatDate(order.createdAt)}</td>
                                                    <td className="px-6 py-4 font-bold text-[#0f172a]">{formatCurrency(order.totalPrice)}</td>
                                                    <td className="px-6 py-4">
                                                        {order.isPaid ?
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span> :
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Chờ thanh toán</span>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => navigate(`/order/${order._id}`)} className="text-[#d4af37] font-bold hover:underline">Xem</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* C. SETTINGS (EDIT FORM - UPDATED) */}
                        {activeTab === 'settings' && (
                            <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
                                <header className="mb-6">
                                    <h1 className="text-3xl font-serif font-bold text-[#0f172a] mb-2">Account Settings</h1>
                                    <p className="text-slate-500 text-sm">Quản lý hồ sơ, bảo mật và tùy chọn thông báo.</p>
                                </header>

                                {/* Feedback */}
                                {message && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2"><FiAlertTriangle /> {message}</div>}
                                {successMessage && <div className="bg-green-50 text-green-600 p-4 rounded-xl border border-green-100 flex items-center gap-2"><FiCheckCircle /> {successMessage}</div>}

                                <form onSubmit={updateProfileHandler} className="space-y-8">

                                    {/* 1. ACCOUNT INFORMATION (ĐÃ BỔ SUNG INPUTS MỚI) */}
                                    <section className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
                                        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                                            <FiUser className="text-[#d4af37] text-xl" />
                                            <h2 className="text-lg font-bold text-[#0f172a] uppercase tracking-wide">Thông Tin Tài Khoản</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Tên hiển thị */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tên Hiển Thị</label>
                                                <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            {/* Email (Readonly) */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email (Cố định)</label>
                                                <div className="relative">
                                                    <input type="email" disabled className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 cursor-not-allowed" value={email} />
                                                    <FiLock className="absolute right-4 top-3.5 text-slate-400" />
                                                </div>
                                            </div>
                                            {/* Số điện thoại */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Số Điện Thoại</label>
                                                <div className="relative">
                                                    <input type="tel" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition pl-10" placeholder="0912..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                    <FiPhone className="absolute left-3.5 top-3.5 text-slate-400" />
                                                </div>
                                            </div>
                                            {/* Ngày sinh */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Ngày Sinh</label>
                                                <div className="relative">
                                                    <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition pl-10" value={dob} onChange={(e) => setDob(e.target.value)} />
                                                    <FiCalendar className="absolute left-3.5 top-3.5 text-slate-400" />
                                                </div>
                                            </div>
                                            {/* Giới tính */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Giới Tính</label>
                                                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                    <option value="male">Nam</option>
                                                    <option value="female">Nữ</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>
                                            {/* Quốc tịch */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Quốc Tịch</label>
                                                <div className="relative">
                                                    <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition pl-10" placeholder="Vietnam" value={nationality} onChange={(e) => setNationality(e.target.value)} />
                                                    <FiFlag className="absolute left-3.5 top-3.5 text-slate-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* 2. SECURITY (ĐỔI MẬT KHẨU) */}
                                    <section className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
                                        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                                            <FiShield className="text-[#d4af37] text-xl" />
                                            <h2 className="text-lg font-bold text-[#0f172a] uppercase tracking-wide">Bảo Mật</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mật Khẩu Mới</label>
                                                <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition" placeholder="Min. 6 ký tự" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Xác Nhận Mật Khẩu</label>
                                                <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#d4af37] outline-none transition" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button type="submit" className="bg-[#0f172a] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#0f172a] transition shadow-lg">Lưu Thay Đổi</button>
                                        </div>
                                    </section>

                                    {/* 3. DANGER ZONE */}
                                    <section className="bg-red-50/50 rounded-2xl p-8 border-2 border-dashed border-red-100">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div>
                                                <h3 className="text-base font-bold text-red-600 flex items-center gap-2"><FiAlertTriangle /> Vùng Nguy Hiểm</h3>
                                                <p className="text-xs text-slate-500 mt-2 max-w-md">Xóa tài khoản là hành động không thể hoàn tác.</p>
                                            </div>
                                            <button type="button" onClick={() => alert('Tính năng này đang bị khóa.')} className="px-6 py-3 border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition whitespace-nowrap">Xóa Tài Khoản</button>
                                        </div>
                                    </section>

                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;