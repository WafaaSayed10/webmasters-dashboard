import React from "react";
import StatsGrid from "../components/statsGrid";
import Transations from "../components/transations";
import MyTable from "../components/Table";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { useInfo } from "../context/dashInfoContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    getDocs
} from "firebase/firestore";

export default function Dashboard() {
    const {userCount, orderCount, totalPrice, totalExpenses}= useInfo()
    const [orders, setOrders] = useState([]);
    const stats=[
        {id:"sales", statName:"total sales", statValue:totalPrice, icon:<IoBagHandleOutline />, color:"bg-sky-500" },
        {id:"expenses", statName:"total expenses", statValue:totalExpenses, icon:<LiaMoneyCheckSolid />, color:"bg-orange-500"},
        {id:"clients", statName:"total clients", statValue:userCount, icon:<LuUsers/>, color:"bg-yellow-500"},
        {id:"orders", statName:"total orders", statValue:orderCount, icon:<AiOutlineShoppingCart/>, color:"bg-green-500"}
    ]
    const fetchOrders = async () => {
        const snapshot = await getDocs(collection(db, "orders"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <>
        <div className="text-[#fff] px-6 py-4">
            <section>
                <h2 className="font-semibold text-[20px] mb-5">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((statGrid)=>
                        <StatsGrid key={statGrid.id} stat={statGrid}/>
                    )}
                </div>
            </section>
            <section className="flex flex-row gap-4 w-full mb-4">
                <Transations />
            </section>
            <section className="w-full mb-4">
                <MyTable orders={orders}/>
            </section>
        </div>
        </>
    );
}
