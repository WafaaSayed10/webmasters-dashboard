import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { GoCheck } from "react-icons/go";
import { Link, Navigate } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreationSuccess(){
    const location = useLocation();
    const navigate = useNavigate();
    const [itemId, setItemId] = useState(null);

    useEffect(() => {
        if (location.state?.id) {
        setItemId(location.state.id);
        } else {
        navigate("/");
        }
    }, [location, navigate]);

    const handleEdit = () => {
        if (itemId) {
            navigate(`/order/${itemId}/edit`);
        }
    };
    return(
        <>
        <main className='h-[600px]'>
            <section className="bg-[#13131F] p-3 w-[85%] md:w-[70%] h-[85%] md:h-[80%] m-10 flex flex-col justify-between items-center">
                <Link to={"/orders"} className='self-end border rounded-full border-[#fff] w-fit text-[25px]'><IoCloseOutline className='text-[#fff]' /></Link>
                <div className='flex gap-[20px] md:gap-[40px] items-center' >
                    <div className=' border-3 rounded-full border-[#349367] p-[2px]' ><GoCheck className='text-green-600 text-[50px] md:text-[70px]'/></div>
                    <div className='text-[#f7f8ff]'>
                        <h1 className='capitalize text-[25px] md:text-[30px] mb-[5px]'>Order succeded</h1>
                        <p className='text-[12px] md:text-[16px]'>Wait a few minutes while the<br/>informations is being validated</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[15px] w-full items-center mb-[30px]'>
                    <button onClick={handleEdit} className='rounded-md text-center capitalize border border-green-600 w-2/3 md:w-1/3 p-[3px] text-[#fff]'>edit</button>
                    <Link to={"/orders"} className='rounded-md text-center capitalize w-2/3 md:w-1/3 p-[3px] text-[#fff] bg-green-600'>close</Link>
                </div>
            </section>
        </main>
        </>
    )
}