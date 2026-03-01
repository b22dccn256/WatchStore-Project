import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const HomePage = () => {
    const { keyword } = useParams(); // <--- 2. Lấy keyword từ URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // 3. Logic gọi API: Nếu có keyword thì thêm vào URL
                const url = keyword
                    ? `http://localhost:5000/api/products?keyword=${keyword}`
                    : 'http://localhost:5000/api/products';

                const { data } = await axios.get(url);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]); // <--- 4. Chạy lại useEffect mỗi khi keyword thay đổi

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Nếu đang tìm kiếm thì hiện nút quay lại */}
            {keyword && (
                <Link to="/" className="inline-block mb-4 text-slate-600 hover:text-amber-600">← Quay lại tất cả sản phẩm</Link>
            )}

            <h1 className="text-2xl font-bold border-l-4 border-amber-500 pl-4 mb-8 text-slate-800">
                {keyword ? `Kết quả tìm kiếm: "${keyword}"` : 'Sản Phẩm Mới Nhất'}
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-amber-500 pl-3">Sản Phẩm Mới Nhất</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                        <Link to={`/product/${product._id}`}>
                            <div className="relative h-64 bg-gray-200">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/no-image.png'; }} />
                            </div>
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product._id}`}>
                                <h3 className="text-lg font-bold text-slate-800 hover:text-amber-600 truncate">{product.name}</h3>
                            </Link>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-xl font-bold text-red-600">${product.price}</span>
                                <button className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm hover:bg-amber-500 transition">Mua</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;