import { createContext, useContext, useState, useEffect } from 'react';
import {db} from "../firebase";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    useEffect(() => {
        const fetchTotalUsers = async () => {
            const snapshot = await getCountFromServer(collection(db, "users"));
            setUserCount(snapshot.data().count);
        };
        const fetchTotalOrders = async () => {
            const snapshot = await getCountFromServer(collection(db, "orders"));
            setOrderCount(snapshot.data().count);
        };
        const fetchTotalPrice = async () => {
            const querySnapshot = await getDocs(collection(db, "orders"));
            let total = 0;
            querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.Total) total += Number(data.Total);
            });
            setTotalPrice(total);
        };
        const fetchTotalExpenses = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            let total = 0;
            querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.totalprice) total += Number(data.totalprice);
            });
            setTotalExpenses(total);
        };
        fetchTotalPrice();
        fetchTotalUsers();
        fetchTotalOrders();
        fetchTotalExpenses();
    }, []);
    return (
        <InfoContext.Provider value={{ userCount, orderCount, totalPrice, totalExpenses }}>
        {children}
        </InfoContext.Provider>
    );
};

export const useInfo = () => useContext(InfoContext)

