import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useMenu } from '../../context/menuContext';

export default function Layout() {
    const {menu} = useMenu()
    return (
        <>
        <div className="bg-[#080811]">
            <div className="grid grid-cols-6">
                <div className="hidden lg:block"><Sidebar /></div>
                <div className="col-span-6 lg:col-span-5">
                    <Navbar/>
                    {<Outlet />}
                    {menu && <div className="absolute left-0 top-0 right-0 w-full lg:hidden"><Sidebar /></div>}
                </div>
            </div>
        </div>
        </>
    );
}
