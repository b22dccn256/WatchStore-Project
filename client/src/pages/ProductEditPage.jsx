import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductEditPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    // Các biến state để lưu dữ liệu form
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        // Hàm lấy thông tin sản phẩm hiện tại
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

                // Đổ dữ liệu vào form
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);

                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Hàm xử lý khi bấm nút "Cập nhật"
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.put(
                `http://localhost:5000/api/products/${id}`,
                {
                    name,
                    price,
                    description,
                    image,
                    brand,
                    category,
                    countInStock,
                },
                config
            );

            alert('Cập nhật thành công!');
            navigate('/admin/products'); // Quay về trang danh sách
        } catch (err) {
            alert('Lỗi cập nhật: ' + err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/admin/products" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
                &larr; Quay lại
            </Link>

            <h1 className="text-2xl font-bold text-slate-800 mb-6 uppercase">Chỉnh sửa Sản phẩm</h1>

            {loading ? (
                <div>Đang tải dữ liệu...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <form onSubmit={submitHandler} className="bg-white p-6 shadow-md rounded-lg space-y-4">

                    {/* Tên sản phẩm */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Giá & Số lượng */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Giá ($)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Tồn kho</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Hình ảnh (Tạm thời nhập Link) */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Hình ảnh (URL)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    {/* Thương hiệu & Danh mục */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Thương hiệu</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Danh mục</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Mô tả</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-amber-600 transition"
                    >
                        CẬP NHẬT SẢN PHẨM
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductEditPage;