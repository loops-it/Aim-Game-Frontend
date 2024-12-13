import React from 'react'
import Logo from '../components/Logo'

export default function CreateWorkshopLayout({ children, headerText, secondaryHeaderText, stepText }) {
    return (
        <div className='bg-white min-h-screen min-w-screen flex flex-col pt-16 items-center relative pb-10' >
            <Logo type="small" />
            <div className='absolute left-5 lg:left-10 top-5 lg:top-10 text-app-gray-4 text-sm lg:text-base' >{stepText}</div>
            <div className={`${headerText || secondaryHeaderText ? "mt-10" : ""} w-[90%] lg:w-[600px] flex flex-col items-center`} >
                <div className={`text-center text-[28px] lg:text-[37px] font-bold mb-2`} >{headerText}</div>
                <p className='text-center text-app-gray-3 text-sm lg:text-base' >{secondaryHeaderText}</p>
            </div>
            {children}
        </div>
    )
}
