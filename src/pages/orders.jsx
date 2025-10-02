import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { db } from "../firebase";
import {
    collection,
    getDocs
} from "firebase/firestore";
import toast from 'react-hot-toast';
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 5,});
    const navigate=useNavigate()
    const fetchOrders = async () => {
        const snapshot = await getDocs(collection(db, "orders"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 100 },
        { field: 'Date', headerName: 'Date', width: 150},
        { field: 'Products', headerName: 'Products', width: 150},
        { field: 'Total', headerName: 'Total Price', width: 150 },
        { field: 'Actions', headerName: 'Actions', width: 150, 
            renderCell: (params) => (
            <div className='flex gap-4 items-center h-full '>
                <div className=' cursor-pointer text-[#00A558] text-lg flex items-center' onClick={()=> handleEdit(params.row.id)}><FiEdit /></div>
                <div className=' cursor-pointer text-red-800 text-2xl flex items-center' onClick={()=> handleDelete(params.row.id)}><MdDelete /></div>
            </div>
            )
        },
    ];
    const rows = orders?.length ?  orders.map((order) => (
        { 
            id: order.id , 
            Name: order.Name ,
            Date: order.Date,
            Products: order.Products,
            Total: order.Total
        }
    )) : [];
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete the order?");
        if (!confirm) return;
        try {
            await deleteDoc(doc(db, "orders", id));
            toast.success("The order has been deleted");
            fetchOrders();
        } catch (error) {
            toast.error("An error occurred while deleting.");
            console.error(error);
        }
    };
    const handleEdit = (id) => {
        navigate(`/order/${id}/edit`);
    };
    return (
        <div className='px-4 pt-3 pb-4 rounded-sm border border-gray-800 flex-1'>
            <div className='text-gray-100 flex justify-between'>
                <strong >Orders</strong>
                <Link to={"/addOrder"} className='flex gap-3 items-center px-4 py-2 border border-gray-700 rounded-md hover:bg-[#13131F]'><FaPlus className='text-green-400'/><span className='text-green-400 '>Add Order</span></Link>
            </div>
            <Paper style={{ height: 400, width: '100%', backgroundColor:"#080811" }} className='text-[#fff] mt-4'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rowsPerPageOptions={[10, 20]}
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#0a0a2a !important',
                        },
                        '& .MuiDataGrid-row.Mui-selected:hover': {
                        backgroundColor: '#111144 !important',
                        },
                        backgroundColor:"transparent",
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#080811',
                            borderBottom: '1px solid #333', // أو rgba(255, 255, 255, 0)
                        },
                         //  2. تغيير لون كل البوردرات إلى رمادي متوسط
                        '& .MuiDataGrid-root': {
                        border: '1px solid #333',
                        },
                        '& .MuiDataGrid-virtualScroller': {
                        borderBottom: '1px solid #333',
                        },
                        '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid #333',
                        },
                        //  1. لون النص في الصفوف والأعمدة
                        '& .MuiDataGrid-cell': {
                            color: '#e1e1e1', // لون نص الصفوف
                            fontSize: '14px',
                            borderBottom: '1px solid #333',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                        color: '#333', // لون عنوان الأعمدة
                        fontWeight: 'bold',
                        fontSize: '15px',
                        backgroundColor:"transparent"
                        },

                        //  2. لون مربع الـ checkbox (محدد وصف غير محدد)
                        '& .MuiCheckbox-root': {
                            color: '#e1e1e1', // لون الـ checkbox (بنفسجي مثلًا)
                        },
                        '& .MuiCheckbox-root.Mui-checked': {
                        color: 'skyblue', // لون لما يتحدد
                        },

                        // ✨ 3. لون الهوفر على الصفوف
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#13131F', // لون فاتح عند المرور على الصف
                        },
                    }}
                />
            </Paper>
        </div>
    );
}

