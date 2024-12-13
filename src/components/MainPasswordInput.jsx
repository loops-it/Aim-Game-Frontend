import React, { useState } from 'react'

export default function MainPasswordInput({ label, ...props }) {

    const [showText, setShowText] = useState(false)

    return (
        <div  >
            <label className='text-app-blue-2 font-normal text-sm lg:text-base' >{label}</label>
            <div className='relative flex items-center' >
                <input
                    {...props}
                    type={showText ? "text" : "password"}
                    className='w-full border border-app-gray h-[50px] px-4 rounded-lg mt-2 text-sm lg:text-base'
                />
                <div onClick={() => setShowText(!showText)} className='absolute cursor-pointer right-2 top-2' >
                    <div className='relative h-[50px] w-14 flex justify-center items-center text-transparent' >
                        <img src='/icons/eyeIconClose.svg' width={25} className={`${showText ? "opacity-100" : "opacity-0"} absolute`} />
                        <img src='/icons/eyeIcon.svg' width={25} className={`${showText ? "opacity-0" : "opacity-100"} absolute`} />
                    </div>
                </div>
            </div>
        </div>
    )
}
