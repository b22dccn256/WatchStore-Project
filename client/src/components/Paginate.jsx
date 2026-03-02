import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
    // Chỉ hiển thị nếu có nhiều hơn 1 trang
    return (
        pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                            keyword
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/page/${x + 1}`
                        }
                        className={`px-4 py-2 border rounded transition ${x + 1 === page
                                ? 'bg-amber-500 text-white font-bold border-amber-500' // Trang hiện tại
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {x + 1}
                    </Link>
                ))}
            </div>
        )
    );
};

export default Paginate;