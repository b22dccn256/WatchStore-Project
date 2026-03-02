import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Meta from '../components/Meta';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook chuyển trang
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State cho phần Review
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);

    // Lấy thông tin User để check đăng nhập
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Hàm load sản phẩm
    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, qty);
        alert('Đã thêm vào giỏ hàng!');
    };

    // Hàm Gửi Đánh Giá
    const submitReviewHandler = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            setReviewLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };

            await axios.post(
                `http://localhost:5000/api/products/${id}/reviews`,
                { rating, comment },
                config
            );

            alert('Cảm ơn bạn đã đánh giá!');
            setReviewLoading(false);
            setComment('');
            setRating(5);
            fetchProduct(); // Load lại trang để hiện review mới
        } catch (err) {
            alert(err.response && err.response.data.message ? err.response.data.message : err.message);
            setReviewLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 mb-6 inline-block">
                &larr; Quay lại
            </Link>

            {/* 1. Thêm Meta động dựa theo tên sản phẩm */}
            {product && <Meta title={product.name} description={product.description} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Ảnh sản phẩm */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain max-h-[500px]"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-amber-500 text-lg font-bold">★ {product.rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-sm">({product.numReviews} đánh giá)</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 mb-6">${product.price}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                    <div className="border-t border-b py-4 mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold text-gray-700">Trạng thái:</span>
                            <span className={product.countInStock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center justify-between mt-4">
                                <span className="font-semibold text-gray-700">Số lượng:</span>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="border rounded px-3 py-1 bg-white outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition transform active:scale-95
              ${product.countInStock > 0
                                ? "bg-slate-900 text-white hover:bg-amber-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                        {product.countInStock > 0 ? "THÊM VÀO GIỎ HÀNG" : "TẠM HẾT HÀNG"}
                    </button>
                </div>
            </div>

            {/* --- KHU VỰC ĐÁNH GIÁ (REVIEWS) --- */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Cột Trái: Danh sách Review */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase border-l-4 border-amber-500 pl-4">
                        Đánh Giá Khách Hàng
                    </h2>
                    {/* Thêm (product.reviews || []) để phòng thủ */}
                    {(product.reviews || []).length === 0 && (
                        <div className="p-4 bg-blue-50 text-blue-700 rounded">Chưa có đánh giá nào. Hãy là người đầu tiên!</div>
                    )}
                    <div className="space-y-4">
                        {/* SỬA LỖI TẠI ĐÂY NỮA: */}
                        {(product.reviews || []).map((review) => (
                            <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <strong className="text-slate-800">{review.name}</strong>
                                    <span className="text-amber-500 text-sm font-bold">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-1">{review.createdAt.substring(0, 10)}</p>
                                <p className="text-gray-800">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cột Phải: Form Viết Review */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase border-l-4 border-slate-900 pl-4">
                        Viết Đánh Giá Của Bạn
                    </h2>

                    {userInfo ? (
                        <form onSubmit={submitReviewHandler} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Đánh giá:</label>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="1">1 - Tệ</option>
                                    <option value="2">2 - Trung bình</option>
                                    <option value="3">3 - Tốt</option>
                                    <option value="4">4 - Rất tốt</option>
                                    <option value="5">5 - Tuyệt vời</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Bình luận:</label>
                                <textarea
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={reviewLoading}
                                className="w-full bg-amber-500 text-slate-900 font-bold py-2 rounded hover:bg-amber-600 transition"
                            >
                                GỬI ĐÁNH GIÁ
                            </button>
                        </form>
                    ) : (
                        <div className="bg-gray-100 p-6 rounded text-center">
                            Bạn cần <Link to="/login" className="text-amber-600 font-bold underline">đăng nhập</Link> để viết đánh giá.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;