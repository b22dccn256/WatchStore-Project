import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Các biến state
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [uploading, setUploading] = useState(false); // <--- State mới: Hiển thị trạng thái đang upload
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
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

    // --- HÀM MỚI: Xử lý Upload file từ máy tính ---
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]; // Lấy file người dùng chọn
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data', // Bắt buộc khi upload file
                },
            };

            // Gọi API Upload
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);

            setImage(data); // Server trả về đường dẫn ảnh -> Tự động điền vào ô image
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
            alert('Lỗi upload ảnh! Hãy kiểm tra lại server.');
        }
    };
    // ----------------------------------------------

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
                    name, price, description, image, brand, category, countInStock,
                },
                config
            );

            alert('Cập nhật thành công!');
            navigate('/admin/products');
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

            {loading ? <div>Đang tải dữ liệu...</div> : error ? <div className="text-red-500">{error}</div> : (
                <form onSubmit={submitHandler} className="bg-white p-6 shadow-md rounded-lg space-y-4">

                    {/* Các ô nhập liệu cơ bản giữ nguyên */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Tên sản phẩm</label>
                        <input type="text" className="w-full px-3 py-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Giá ($)</label>
                            <input type="number" className="w-full px-3 py-2 border rounded" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Tồn kho</label>
                            <input type="number" className="w-full px-3 py-2 border rounded" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
                        </div>
                    </div>

                    {/* --- PHẦN HÌNH ẢNH (NÂNG CẤP) --- */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Hình ảnh</label>

                        {/* 1. Ô nhập Link (Vẫn giữ để sửa tay nếu muốn) */}
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded mb-2 focus:ring-2 focus:ring-amber-500"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Nhập link hoặc chọn file bên dưới"
                        />

                        {/* 2. Nút chọn File Upload */}
                        <input
                            type="file"
                            onChange={uploadFileHandler}
                            className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-amber-50 file:text-amber-700
                                hover:file:bg-amber-100"
                        />
                        {uploading && <div className="text-sm text-gray-500 mt-1 italic">Đang tải ảnh lên...</div>}
                    </div>
                    {/* ------------------------------- */}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Thương hiệu</label>
                            <input type="text" className="w-full px-3 py-2 border rounded" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Danh mục</label>
                            <input type="text" className="w-full px-3 py-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Mô tả</label>
                        <textarea className="w-full px-3 py-2 border rounded" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-amber-600 transition">
                        CẬP NHẬT SẢN PHẨM
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductEditPage;