import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex items-center w-full max-w-lg bg-white rounded-full overflow-hidden shadow-inner border border-gray-200">
            <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm đồng hồ ..."
                className="flex-grow px-5 py-2 text-gray-700 focus:outline-none text-sm placeholder-gray-400"
            />
            <button type="submit" className="bg-accent text-white px-5 py-3 hover:bg-yellow-600 transition duration-300 flex items-center justify-center">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchBox;