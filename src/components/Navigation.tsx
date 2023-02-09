import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {
    const [page, setPage] = useState('Home')

    return (
        <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
            <h3 className='font-bold'>GitHub Search</h3>
            <span>
                <Link
                    onClick={() => setPage('Home')}
                    to='/'
                    className={`mr-2 hover:opacity-50 transition ${page === 'Home' && 'underline'}`}
                >
                    Home
                </Link>
                <Link
                    onClick={() => setPage('Favorites')}
                    to='/favorites'
                    className={`hover:opacity-50 transition ${page === 'Favorites' && 'underline'}`}
                >
                    Favorites
                </Link>
            </span>
        </nav>
    );
};

export default Navigation;