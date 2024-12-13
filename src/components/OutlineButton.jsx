import React from 'react'

export default function OutlineButton({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className='w-full border text-app-blue-2 border-app-blue-2 h-[42px] text-sm lg:text-base px-7 flex justify-center items-center'
        >{children}</div>
    )
}
