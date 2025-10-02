import * as React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react"
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; 

export default function Register(){
    const [form, setForm]= useState({
        phone:"",
        pass:"",
        passConfirm:"",
        fName:"",
        lName:"",
        email:""
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 
    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let newErrors = {};
        const isEmptyField = Object.values(form).some(value => value.trim() === "");
        if (isEmptyField) {
            newErrors.error="All fields are required"
            setErrors(newErrors);
            return;
        }
        if (form.pass !== form.passConfirm) {
            newErrors.passConfirm="Passwords do not match";
        }
        if (form.pass.length <6) {
            newErrors.pass="Password should be at least 6 characters";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            newErrors.email = 'Invalid email';
        }
        const phoneRegex = /^01\d{9}$/;
        if (!phoneRegex.test(form.phone)) {
            newErrors.phone = 'invalid phone number';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.pass);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: form.fName,
            });
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                fName: form.fName,
                lName: form.lName,
                phone: form.phone,
                email: form.email,
            });
            toast.success('Account created!', {
                position: 'top-center',
            });
            navigate("/");
            } catch (error) {
                alert(error.message);
                /*newErrors.err="Invalid data"
                setErrors(newErrors);*/
            }
        }
    }
    return(
        <>
        <main>
            <div className="bg-[#080811] h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit} className="max-w-[400px] sm:w-[400px] m-auto bg-[#0B0B17] border border-gray-800 px-[25px] py-[15px] flex flex-col gap-[15px] rounded-[5px] shadow-sm">
                    <h1 className="mb-[10px] text-[25px] text-[#fff] leading-none">Register<span className="text-[16px] ml-[5px]">It's easy and always will be.</span></h1>
                    <input onChange={handleChange} value={form.phone} type="tel" name="phone" placeholder="Telephone" autoComplete="telephone" className="p-[10px] border rounded-[5px] w-full bg-transparent text-[#fff]" />
                    {errors.phone&&<p className="text-[13px] text-red-500">{errors.phone}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10px] gap-y-[15px]">
                        <input onChange={handleChange} value={form.pass} type="password" name="pass" placeholder="Password" autoComplete="new password" className="p-[10px] border rounded-[5px] w-full bg-transparent text-[#fff]" />
                        <input onChange={handleChange} value={form.passConfirm} type="password" name="passConfirm" placeholder="Password Confirm" autoComplete="new password" className="p-[10px] border rounded-[5px] w-full bg-transparent text-[#fff]" />
                        {errors.pass || errors.passConfirm &&<div className="col-span-2">
                            {errors.pass&& <p className="text-[13px] text-red-500">{errors.pass}</p>}
                            {errors.passConfirm&&<p className="text-[13px] text-red-500">{errors.passConfirm}</p>}
                        </div>}
                        <input onChange={handleChange} value={form.fName} type="text" name="fName" placeholder="First Name" autoComplete="user name" className="p-[10px] border rounded-[5px] w-full bg-transparent text-[#fff]" />
                        <input onChange={handleChange} value={form.lName} type="text" name="lName" placeholder="Last Name" autoComplete="user name" className="p-[10px] border rounded-[5px] w-full bg-transparent text-[#fff]" />
                    </div>
                    <input onChange={handleChange} value={form.email} type="text" name="email" placeholder="Email Address" autoComplete="email" className="p-[10px] border rounded-[5px] w-full bg-transparent text-[#fff]" />
                    {errors.email&&<p className="text-[13px] text-red-500">{errors.email}</p>}
                    {/**<label className="flex gap-[8px] my-[5px] text-[14px] leading-none">
                        <input type="checkbox"/>
                        Keep me up-to-date with offers by email
                    </label>**/}
                    {errors.error&& <p className="text-[13px] text-red-500">{errors.error}</p>}
                    {errors.err&&<p className="text-[13px] text-red-500">{errors.err}</p>}
                    <button type="submit" className="bg-green-600 text-[#fff] text-[17.5px] font-semibold p-[10px] rounded-[5px]">Register</button>
                    <Link to="/login" className="text-[#fff] hover:underline transition duration-300 text-center text-[14px]">Login</Link>
                </form>
            </div>
        </main>
        </>
    )
}