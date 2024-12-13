import React from 'react'

export default function MainButton({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={` ${className} w-full bg-app-blue-2 px-4 text-white h-[50px] rounded-lg text-sm lg:text-base flex justify-center items-center`}
        >{children}
        </button>
    )
}
