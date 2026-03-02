import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

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
                setProducts(data.products);
                setPages(data.pages);
                setPage(data.page);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword, pageNumber]); // <--- 4. Chạy lại useEffect mỗi khi keyword thay đổi

    return (
        <div className="container mx-auto px-4 py-8">
            {keyword && (
                <Link to="/" className="inline-block mb-4 text-slate-600 hover:text-amber-600">← Quay lại tất cả sản phẩm</Link>
            )}

            <h1 className="text-2xl font-bold border-l-4 border-amber-500 pl-4 mb-8 text-slate-800">
                {keyword ? `Kết quả: "${keyword}"` : 'Sản Phẩm Mới Nhất'}
            </h1>

            {loading ? (
                <div>Đang tải...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    {/* Lưới sản phẩm */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full border border-gray-100">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                                    />
                                </Link>
                                <div className="p-5 flex-grow flex flex-col justify-between">
                                    <div>
                                        <Link to={`/product/${product._id}`}>
                                            <h2 className="text-lg font-bold text-slate-800 hover:text-amber-600 mb-2 truncate">
                                                {product.name}
                                            </h2>
                                        </Link>
                                        <div className="flex items-center mb-2">
                                            <span className="text-amber-500 font-bold text-sm">★ {product.rating.toFixed(1)}</span>
                                            <span className="text-gray-400 text-xs ml-2">({product.numReviews} đánh giá)</span>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold text-slate-900 mt-2">${product.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 5. THANH PHÂN TRANG */}
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </div>
    );
};

export default HomePage;