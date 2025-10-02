import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useMenu } from '../../context/menuContext';
import { useSearch } from '../../context/SearchContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const {menu, setMenu} = useMenu()
    const {searchTerm, setSearchTerm} = useSearch()
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (location.pathname !== '/products') {
        navigate('/products');
        }
    };
    return (
        <div className='px-6 py-4  text-white flex justify-between items-center border-b border-gray-800' >
            <div className='flex items-center gap-1 px-2 py-1 rounded-md border border-gray-600'>
                <IoSearch />
                <input onChange={handleSearch} value={searchTerm} type='text' name='search' className='px-2 py-1 bg-transparent text-gray-100 focus:outline-none active:outline-none rounded-xl' placeholder='Search...'/>
            </div>
            <FaBars onClick={()=>setMenu(!menu)} className='lg:hidden'/>
        </div>
    )
}
