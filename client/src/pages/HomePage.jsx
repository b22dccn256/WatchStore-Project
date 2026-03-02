import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Product from '../components/Product';

const HomePage = () => {
    const { keyword, pageNumber } = useParams();
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(1); // Tổng số trang
    const [page, setPage] = useState(1);   // Trang hiện tại
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Logic URL: Thêm pageNumber vào query
                const currentPage = pageNumber || 1;

                // Logic gọi API: Nếu có keyword thì thêm vào URL
                const url = keyword
                    ? `http://localhost:5000/api/products?keyword=${keyword}`
                    : 'http://localhost:5000/api/products';

                const { data } = await axios.get(url);
                // Xử lý dữ liệu trả về (Mảng hoặc Object phân trang)
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts(data.products);
                    setPages(data.pages);
                    setPage(data.page);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword, pageNumber]); // <--- 4. Chạy lại useEffect mỗi khi keyword thay đổi

    return (
        <div className="bg-secondary min-h-screen">
            <Meta title="WatchStore - Premium Marketplace" />

            {/* --- 1. HERO BANNER (Chỉ hiện ở trang chủ, không hiện khi tìm kiếm) --- */}
            {!keyword && !pageNumber && (
                <div className="relative bg-primary h-[400px] flex items-center overflow-hidden">
                    {/* Nền Ảnh Banner (Mờ đi để hiện chữ) */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop"
                            alt="Luxury Watch Banner"
                            className="w-full h-full object-cover opacity-40"
                        />
                        {/* Gradient phủ lên để làm nổi bật chữ */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
                    </div>

                    {/* Nội dung chữ trên Banner */}
                    <div className="container mx-auto px-4 z-10 grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="text-white space-y-4 animate-fade-in-up">
                            <p className="text-accent uppercase tracking-[0.2em] font-bold text-sm">Premium Marketplace</p>
                            <h1 className="text-5xl md:text-5xl font-serif font-bold leading-tight">
                                TIMELESS ELEGANCE, <br />
                                <span className="text-accent">MODERN LUXURY</span>
                            </h1>
                            <p className="text-gray-300 text-base max-w-lg font-sans font-light">
                                Khám phá bộ sưu tập đồng hồ đẳng cấp thế giới. Sự kết hợp hoàn hảo giữa kỹ thuật chế tác đỉnh cao và phong cách thời thượng.
                            </p>
                            <button className="bg-accent text-white px-6 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition duration-300 shadow-lg mt-4">
                                Khám phá ngay
                            </button>
                        </div>

                        {/* Hình ảnh đồng hồ nổi bật (Bên phải) */}
                        <div className="hidden md:block relative">
                            <img
                                src="https://pngimg.com/d/rolex_PNG15.png"
                                alt="Hero Watch"
                                className="w-[300px] h-auto mx-auto drop-shadow-2xl animate-float" // animate-float là custom class
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* --- 2. MAIN CONTENT --- */}
            <div className="container mx-auto px-4 py-10">

                {/* Tiêu đề Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
                        {keyword ? `Kết quả tìm kiếm: "${keyword}"` : 'LATEST ARRIVALS'}
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading luxury pieces...</div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <>
                        {/* Lưới sản phẩm (Grid) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>

                        {/* Phân trang */}
                        <div className="mt-12">
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;