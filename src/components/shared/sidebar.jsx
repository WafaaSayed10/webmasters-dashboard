import { Link, useLocation } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { TbLogout } from "react-icons/tb";
import clsx from "clsx";
import links from '../../lib/navLinks'
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useMenu } from '../../context/menuContext';

export default function Sidebar(){
    const {pathname}= useLocation()
    const navigate= useNavigate()
    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };
    const {setMenu} = useMenu()
    return (
        <>
        <div className="fixed top-0 left-0 lg:w-1/6 bg-[#0B0B17] text-gray-300 py-4 px-5 flex flex-col h-screen border-r border-gray-800">
            <div className="flex flex-col flex-1">
                <Link to={"/"} className="flex items-center mb-5 gap-3 px-3 py-2"><FcBullish className="text-[25px]"/>Abu</Link>
                {links.map((link)=>
                    <Link to={link.path} onClick={()=>setMenu(false)} key={link.id} className={clsx(pathname==link.path?'text-gray-100 bg-gray-600':'',`hover:bg-[#13131F] px-3 py-2 transition duration-300 rounded-sm flex items-center gap-3 capitalize`)}>{link.icon} {link.linkName}</Link>
                )}
            </div>
            <button onClick={handleLogout} className="hover:bg-[#13131F] text-red-500 px-3 py-2 transition duration-300 rounded-sm flex items-center gap-3 mt-3 border-t border-gray-800"><TbLogout />Logout</button>
        </div>
        </>
    )
}