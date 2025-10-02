import * as React from 'react'
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; 

export default function Login(){
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('')
    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(email.trim ==='' || password.trim() ===''){
            setError("Invalid email or password")
            return;
        }
        try{
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Logged in successfully.", {
                position: 'top-center',
            })
            navigate("/");
        }
        catch(error){
            console.log(error)
            setError("Invalid email or password")
        }
    }
    return(
        <>
        <main>
            <div className="bg-[#080811] h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit} className="max-w-[400px] sm:w-[400px] m-auto bg-[#0B0B17] border border-gray-800 px-[25px] py-[15px] flex flex-col gap-[15px] rounded-[5px] shadow-sm">
                    <h1 className="text-[25px] text-[#fff]">Log In</h1>
                    <div className="flex">
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" name="email" placeholder="Email" autoComplete="email" className="px-[10px] py-[5px] border rounded-tl-[5px] rounded-bl-[5px] w-full bg-transparent text-[#fff] " />
                        <div className="p-[12px] bg-gray-200"><FaUser /></div>
                    </div>
                    <div className="flex">
                        <input onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" name="password" placeholder="Password" autoComplete="current password" className="px-[10px] py-[5px] border rounded-tl-[5px] rounded-bl-[5px] w-full bg-transparent text-[#fff]" />
                        <div className="p-[12px] bg-gray-200"><FaLock /></div>
                    </div>
                    {error&&<p className="text-[13px] text-[#fff]">{error}</p>}
                    <button type="submit" className="bg-green-600 text-[#fff] text-[17.5px] font-semibold p-[10px] rounded-[5px]">Login</button>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-[15px]">
                        <p className="self-start sm:self-center text-[14px] hover:underline transition duration-300 cursor-pointer text-[#fff]">Forget password?</p>
                        <Link to="/register" className="text-center border w-full sm:w-1/2 p-[10px] text-[17.5px] font-semibold rounded-[5px] border-[#fff] text-[#fff] hover:text-[#fff] hover:bg-green-600 hover:border-green-600 transition duration-300">Register</Link>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}