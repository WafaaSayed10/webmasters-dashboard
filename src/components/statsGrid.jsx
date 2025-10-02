import React from 'react'
import clsx from 'clsx'

export default function StatsGrid({stat}) {
    return (
        <div>
            <div className='flex items-center gap-3 bg-tranparent border border-gray-800 rounded-md p-4 capitalize'>
                <div className={clsx(`p-2 rounded-full ${stat.color}`)}>
                    {stat.icon}
                </div>
                <div>
                    <h2 className='font-semibold text-gray-400'>{stat.statName}</h2>
                    <p className=''>{stat.statValue}</p>
                </div>
            </div>
        </div>
    )
}