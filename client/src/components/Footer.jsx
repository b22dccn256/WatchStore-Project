import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-[#0c1626] text-gray-300 pt-16 pb-8 border-t border-[#1e293b]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* CỘT 1: GIỚI THIỆU */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <span className="text-3xl">⌚</span>
                            <div className="flex flex-col">
                                <span className="font-serif font-bold text-xl text-[#d4b871] tracking-wide">WatchStore</span>
                                <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Premium Marketplace</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 text-gray-400">
                            Chuyên cung cấp các dòng đồng hồ chính hãng cao cấp từ Rolex, Hublot, Omega. Cam kết chất lượng và dịch vụ hậu mãi chuẩn 5 sao.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-[#d4b871] hover:text-white transition duration-300"><FiFacebook /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-[#d4b871] hover:text-white transition duration-300"><FiInstagram /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-[#d4b871] hover:text-white transition duration-300"><FiYoutube /></a>
                        </div>
                    </div>

                    {/* CỘT 2: LIÊN KẾT NHANH */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-[#d4b871]">
                            Liên Kết Nhanh
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-[#d4b871] transition">Trang Chủ</Link></li>
                            <li><Link to="/about" className="hover:text-[#d4b871] transition">Về Chúng Tôi</Link></li>
                            <li><Link to="/search/rolex" className="hover:text-[#d4b871] transition">Bộ Sưu Tập Rolex</Link></li>
                            <li><Link to="/contact" className="hover:text-[#d4b871] transition">Liên Hệ</Link></li>
                            <li><Link to="/blog" className="hover:text-[#d4b871] transition">Tin Tức Đồng Hồ</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 3: CHÍNH SÁCH */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-[#d4b871]">
                            Chăm Sóc Khách Hàng
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/policy" className="hover:text-[#d4b871] transition">Chính Sách Bảo Hành</Link></li>
                            <li><Link to="/shipping" className="hover:text-[#d4b871] transition">Chính Sách Vận Chuyển</Link></li>
                            <li><Link to="/return" className="hover:text-[#d4b871] transition">Đổi Trả Hàng Hóa</Link></li>
                            <li><Link to="/privacy" className="hover:text-[#d4b871] transition">Bảo Mật Thông Tin</Link></li>
                            <li><Link to="/faq" className="hover:text-[#d4b871] transition">Câu Hỏi Thường Gặp</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 4: THÔNG TIN LIÊN HỆ */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-[#d4b871]">
                            Thông Tin Liên Hệ
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <FiMapPin className="text-[#d4b871] text-xl mt-1" />
                                <span>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiPhone className="text-[#d4b871] text-xl" />
                                <span>1900 123 456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiMail className="text-[#d4b871] text-xl" />
                                <span>cskh@watchstore.com</span>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="text-white text-sm font-bold mb-3">Đăng ký nhận tin</h4>
                            <div className="flex border border-gray-600 rounded overflow-hidden">
                                <input type="email" placeholder="Email của bạn..." className="bg-transparent px-3 py-2 text-sm w-full focus:outline-none text-white placeholder-gray-500" />
                                <button className="bg-[#d4b871] px-4 py-2 text-[#0c1626] font-bold hover:bg-yellow-600 transition">
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* BOTTOM FOOTER */}
                <div className="border-t border-[#1e293b] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; 2026 WatchStore Premium. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-50 hover:opacity-100 transition" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 hover:opacity-100 transition" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6 opacity-50 hover:opacity-100 transition" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;