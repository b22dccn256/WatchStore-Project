import { useParams, Link } from 'react-router-dom';

const OrderDetailsPage = () => {
    const { id } = useParams(); // Lấy mã đơn hàng từ URL xuống

    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <div className="bg-green-100 text-green-800 p-8 rounded-xl shadow-lg inline-block">
                <h1 className="text-4xl mb-4">🎉</h1>
                <h2 className="text-2xl font-bold mb-2">Đặt Hàng Thành Công!</h2>
                <p className="mb-6">Cảm ơn bạn đã mua sắm tại WatchStore.</p>
                <p className="font-mono bg-white p-3 rounded border border-green-200 mb-6">
                    Mã đơn hàng của bạn: <strong>{id}</strong>
                </p>

                <Link to="/" className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-amber-500 transition font-bold">
                    Tiếp tục mua sắm
                </Link>
            </div>
        </div>
    );
};

export default OrderDetailsPage;