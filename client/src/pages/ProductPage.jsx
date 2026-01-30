import { useParams, Link } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();
    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-gray-500 hover:text-amber-600 mb-4 inline-block">← Quay lại</Link>
            <div className="bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-slate-800">Chi tiết sản phẩm</h1>
                <p>ID: {id}</p>
            </div>
        </div>
    );
};

export default ProductPage;