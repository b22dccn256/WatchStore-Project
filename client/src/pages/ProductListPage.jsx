import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProductListPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Hàm lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        } else {
            fetchProducts();
        }
    }, [navigate]);

    // Hàm xử lý Xóa sản phẩm
    const deleteHandler = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);

                // Xóa xong thì load lại danh sách
                fetchProducts();
                alert('Đã xóa thành công!');
            } catch (err) {
                alert('Lỗi khi xóa: ' + err.message);
            }
        }
    };

    //Hàm xứ lý tạo sản phẩm mới
    const createHandler = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            // 1. Gọi API tạo sản phẩm mẫu
            const { data } = await axios.post('http://localhost:5000/api/products', {}, config);

            // 2. Tạo xong -> Chuyển hướng ngay sang trang Sửa để điền thông tin
            navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
            alert('Lỗi khi tạo: ' + err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800 uppercase">Quản lý Sản Phẩm</h1>
                <button onClick={createHandler} className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-amber-600 transition">
                    + Thêm Mới
                </button>
            </div>

            {loading ? (
                <div>Đang tải...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">TÊN</th>
                                <th className="p-4">GIÁ</th>
                                <th className="p-4">DANH MỤC</th>
                                <th className="p-4">HÃNG</th>
                                <th className="p-4">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="p-4 font-mono text-xs">{product._id}</td>
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">${product.price}</td>
                                    <td className="p-4">{product.category}</td>
                                    <td className="p-4">{product.brand}</td>
                                    <td className="p-4 flex gap-2">
                                        <Link to={`/admin/product/${product._id}/edit`} className="bg-gray-200 text-slate-800 px-3 py-1 rounded text-sm hover:bg-gray-300">
                                            ✏ Sửa
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                        >
                                            🗑 Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;