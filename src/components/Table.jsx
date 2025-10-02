import * as React from 'react';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'Name', headerName: 'Name' },
    { field: 'Date', headerName: 'Date'},
    { field: 'Products', headerName: 'Products' },
    { field: 'Total', headerName: 'Total Price'},
];
export default function MyTable({orders}) {
    return(
        <>
        <div className='px-4 pt-3 pb-4 rounded border border-gray-800 flex-1'>
            <strong>Recent Orders</strong>
            <div className='overflow-x-auto mt-3'>
                <table border="1" className='min-w-full table-auto border border-gray-700'>
                    <thead className="bg-[#13131F]">
                        <tr>
                            {columns.map((hd)=>
                            <th className='text-left py-2 px-4 border-b border-gray-800' key={hd.field}>{hd.headerName}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((rd)=><tr className='hover:bg-[#13131F]' key={rd.id}>
                            <td className='py-2 px-4 border-b border-gray-800'>{rd.id}</td>
                            <td className='py-2 px-4 border-b border-gray-800'>{rd.Name}</td>
                            <td className='py-2 px-4 border-b border-gray-800'>{rd.Date}</td>
                            <td className='py-2 px-4 border-b border-gray-800'>{rd.Products}</td>
                            <td className='py-2 px-4 border-b border-gray-800'>{rd.Total}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
