import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    // Nếu chỉ có 1 trang thì không hiện thanh phân trang
    if (pages <= 1) return null;

    return (
        <div className="flex justify-center mt-10 gap-2">
            {[...Array(pages).keys()].map((x) => (
                <Link
                    key={x + 1}
                    to={
                        !isAdmin
                            ? keyword
                                ? `/search/${keyword}/page/${x + 1}` // Link khi đang tìm kiếm
                                : `/page/${x + 1}`                   // Link phân trang bình thường
                            : `/admin/productlist/${x + 1}`        // Link cho Admin
                    }
                    className={`px-4 py-2 rounded font-bold transition-all duration-300 shadow-sm border ${x + 1 === page
                            ? 'bg-[#d4b871] text-white border-[#d4b871]' // Trang hiện tại (Màu vàng Gold)
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200 hover:border-[#d4b871] hover:text-[#d4b871]'
                        }`}
                >
                    {x + 1}
                </Link>
            ))}
        </div>
    );
};

export default Paginate;