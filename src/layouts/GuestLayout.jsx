import React from 'react'
import Logo from '../components/Logo'

export default function GuestLayout({ children, headerText, secondaryHeaderText }) {
    return (
        <div className='bg-white min-h-screen min-w-screen flex flex-col pt-16 lg:pt-0 lg:justify-center items-center pb-10' >
           
            <Logo />
            <div className={`${headerText || secondaryHeaderText ? "mt-14" : ""} w-[90%] lg:w-[600px] flex flex-col items-center`} >
                <div className={`text-center text-[28px] lg:text-[37px] font-bold mb-2`} >{headerText}</div>
                <p className='text-center text-app-gray-3 text-sm lg:text-base' >{secondaryHeaderText}</p>
            </div>
            {children}
        </div>
    )
}
