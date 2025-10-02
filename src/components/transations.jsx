import React from 'react'
import EIData from '../lib/income&expenseData'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Transations() {
    return (
        <div className='h-[22rem] rounded-sm p-4 border border-gray-800 flex flex-col flex-1 mt-4 text-black'>
            <strong className='text-[#fff]'>Transations</strong>
            <div className='w-full mt-3 flex-1'>
                <ResponsiveContainer className="w-full h-full">
                    <BarChart width={500} height={300} data={EIData} margin={{top: 20, right: 10, bottom: -10,left:0}}>
                        <CartesianGrid stroke="#999" strokeDasharray="3 3 0 0" vertical={false}/>
                        <XAxis dataKey="name" tick={{ fill: '#f9fafb'}}/>
                        <YAxis tick={{ fill: '#f9fafb' }}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Expense" fill="#f97316"/>
                        <Bar dataKey="Income" fill="#0ea5e9"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
//#ea588c
//#8ea5e9