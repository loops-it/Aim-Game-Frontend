/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

export default function MainRequiredInput({ label, onChange, value, className, ...props }) {
    const handleInputChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <>
            <div>
            {label && <label className='mb-2 text-app-blue-2 font-normal text-sm lg:text-base' >{label}</label>}
            <input
                {...props}
                required
                // onChange={e => onChange(e.target.value)}
                value={value || ''}
                onChange={handleInputChange}
                className={`w-full border border-app-gray h-[50px] px-4 rounded-lg text-sm lg:text-base`}
            />
            </div>
        </>
    )
}
