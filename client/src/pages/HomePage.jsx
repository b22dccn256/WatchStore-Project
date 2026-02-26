import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
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