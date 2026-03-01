import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // Điều hướng sang trang chủ kèm từ khóa
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex flex-grow max-w-lg mx-4">
            <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm đồng hồ..."
                className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
                type="submit"
                className="bg-amber-500 text-slate-900 px-4 py-2 rounded-r-md font-bold hover:bg-amber-600 transition"
            >
                Tìm
            </button>
        </form>
    );
};

export default SearchBox;