import { useState, useEffect, useContext } from 'react'; // Thêm useContext
import { useParams, Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Import Context

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Dùng để chuyển trang
    const { addToCart } = useContext(CartContext); // Lấy hàm thêm giỏ hàng ra dùng

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    // ... (Giữ nguyên đoạn useEffect gọi API cũ) ...
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi:", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-20">Đang tải...</div>;
    if (!product) return <div className="text-center mt-20 text-red-500">Không tìm thấy!</div>;

    // --- HÀM XỬ LÝ KHI BẤM NÚT MUA ---
    const handleAddToCart = () => {
        addToCart(product, qty); // 1. Gọi hàm thêm vào Context
        // 2. Chuyển hướng người dùng sang trang Giỏ hàng (CartPage)
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* ... (Giữ nguyên phần hiển thị ảnh và thông tin bên trên) ... */}
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-amber-600 mb-6 transition">
                ← Quay lại trang chủ
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Cột Trái: Ảnh (Giữ nguyên code cũ) */}
                    <div className="p-8 bg-gray-50 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="max-h-[500px]" />
                    </div>

                    {/* Cột Phải */}
                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="text-3xl font-bold text-red-600 mb-6">${product.price}</div>
                        <p className="mb-6">{product.description}</p>

                        {/* ... (Đoạn thông số kỹ thuật giữ nguyên) ... */}

                        {/* LOGIC MUA HÀNG & KHO */}
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center gap-3">
                                <span className="font-bold">Trạng thái:</span>
                                <span className={product.countInStock > 0 ? "text-green-600" : "text-red-600"}>
                                    {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                                </span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex items-center gap-3">
                                    <span className="font-bold">Số lượng:</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="border p-2 rounded"
                                    >
                                        {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={handleAddToCart} // <--- GẮN SỰ KIỆN VÀO ĐÂY
                                disabled={product.countInStock === 0}
                                className={`w-full py-3 rounded-lg font-bold text-white transition ${product.countInStock > 0 ? "bg-slate-900 hover:bg-slate-700" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {product.countInStock > 0 ? "THÊM VÀO GIỎ HÀNG" : "HẾT HÀNG"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;