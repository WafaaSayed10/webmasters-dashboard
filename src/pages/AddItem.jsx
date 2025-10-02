import React from 'react';
import { useState } from "react";
import { FiX, FiCalendar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {db} from "../firebase";
import {collection , addDoc} from "firebase/firestore"
import toast from "react-hot-toast";

export default function AddItemModal() {
  const navigate = useNavigate()
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");
  const [formData, setformData] = useState({
    Name: "",  
    Category: "",
    Date : "",
    price: '' ,
    totalprice: '' ,
    Stock: "" 
  });
  const handelInputChange = (event) => {
      const {name , value} = event.target;
      setformData({
          ...formData,
          [name]:value
      })
  };
  const handleSubmit = async (e) => {
      e.preventDefault()
      const isEmptyField = Object.values(formData).some(value => value.trim() === "");
      if (isEmptyField) {
        toast.error("All fields are required",{
          icon: "⚠️"
        });
        return;
      }
      console.log(formData);
      try{
        const response =  await addDoc(collection(db, "products") , formData);
        console.log("data" , response);
        navigate("/creation-success", { state: { id: response.id } })
      }catch(error){
        console.log(error.massage);
      }
  }
  return (
    <div className="px-10 py-8">
      <div className="bg-[#13131F] text-white w-full max-w-5xl p-6 md:p-10 rounded-md grid grid-cols-1 md:grid-cols-3 gap-8 relative min-h-[500px]">
        <Link to={"/products"} className="absolute text-xl text-white top-4 right-4">
          <FiX />
        </Link>
        <div className="flex flex-col justify-between col-span-1">
          <h2 className="mb-4 text-3xl font-light">
            Add a new product
          </h2>
          <div className="flex flex-col gap-3 ">
            <Link to={"/products"} className="w-full text-center px-6 py-2 text-white bg-transparent border rounded-md text-[18px] border-green-600">
              Cancel
            </Link>
            <button onClick={handleSubmit} className= "text-center w-full px-6 py-2 text-white rounded-md text-[18px] bg-green-600">
              Add
            </button>
          </div>
        </div>
        <form className="flex flex-col gap-6 col-span-1  md:col-span-2">
          <div className="flex flex-col lg:flex-row w-full gap-3.5">
            <div className="w-full">
              <label htmlFor="Name" className="text-sm">Product Name</label>
              <input
                type="text"
                name="Name" 
                id="Name"
                onChange={handelInputChange} value={formData.Name}
                placeholder="Product Name"
                className="w-full p-2 mt-1 bg-transparent border border-white rounded-md"
              />
            </div>

            <div className="w-full">
              <label htmlFor="category" className="text-sm">Category</label>
              <input
                type="text"
                name="Category" 
                id="category"
                onChange={handelInputChange} value={formData.Category}
                placeholder="Category"
                className="w-full p-2 mt-1 bg-transparent border border-white rounded-md"
              />
            </div>
          </div>

          <div className="flex w-full gap-3.5">
            <div className="w-full">
              <label htmlFor="Date" className="text-sm">Date</label>
              <div className="relative mt-1">
                <input
                type="text"
                  value={date}
                  name="Date" 
                  id="Date"
                  onChange={handelInputChange}
                  //  value={formData.Date}
                  onClick={() => setShowCalendar(!showCalendar)}
                  readOnly
                  placeholder="Date"
                  className="w-full p-2 pr-10 bg-transparent border border-white rounded-md cursor-pointer"
                />
                <FiCalendar className="absolute text-white -translate-y-1/2 right-3 top-1/2" />
                {showCalendar && (
                  <div className="absolute z-10 top-full mt-2 bg-[#0D0D5E] border border-white rounded-md p-4 w-64">
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-bold">SEPTEMBER</span>
                      <span>2017</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div key={i} className="font-bold text-center">{d}</div>
                      ))}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const selectedDate = `September ${i + 1}`;
                            setDate(selectedDate);
                            setformData(prev => ({ ...prev, Date: selectedDate }));
                            setShowCalendar(false);
                            // setDate(`September ${i + 1}`);
                            // setShowCalendar(false);
                            // handelInputChange({value : `September ${i + 1}`})
                            
                          }}
                          className="py-1 text-center rounded-md hover:bg-green-500"
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-3.5">
            <div>
            <label htmlFor="price" className="text-sm">Price</label>
            <input
              type="number"
              name="price" 
              id="price"
              onChange={handelInputChange} value={formData.price}
              className="w-full p-2 mt-1 text-3xl bg-transparent border border-white rounded-md"
              
            />
          </div>
          <div>
            <label htmlFor="totalprice" className="text-sm">Total Price</label>
            <input
              type="number"
              name="totalprice" 
              id="totalprice"
              onChange={handelInputChange} value={formData.totalprice}
              className="w-full p-2 mt-1 text-3xl  bg-transparent border border-white rounded-md"
              // defaultValue={0}
            />
          </div>
        </div>

          <div>
            <label htmlFor="Stock" className="text-sm">Stock</label>
            <input
              type="number"
              name="Stock" 
              id="Stock"
              onChange={handelInputChange} value={formData.Stock}
              className="w-full p-2 mt-1 text-3xl text-right bg-transparent border border-white rounded-md"
              
            />
          </div>
        </form>
      </div>
    </div>
  );
}
