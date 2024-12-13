import React from 'react'

export default function MainCheckbox({ title, id }) {
    return (
        <div className='flex items-center gap-2 w-fit' >
            <input className='w-6 h-6 border-app-gray-4 accent-app-blue' id={id} type='checkbox' />
            <label className='text-app-gray-4 text-sm cursor-pointer' htmlFor={id} >{title}</label>
        </div>
    )
}
