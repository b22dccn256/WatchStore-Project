import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/productlist/${x + 1}` // <--- Link dành riêng cho Admin
                        }
                        className={`px-4 py-2 border rounded transition ${x + 1 === page
                                ? 'bg-amber-500 text-white font-bold border-amber-500'
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