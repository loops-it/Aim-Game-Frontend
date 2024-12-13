import React from 'react'

export default function MainDateInput({ label, onChange, className, ...props }) {

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div>
            {label && <label className='mb-2 text-app-blue-2 font-normal text-sm lg:text-base' >{label}</label>}
            <input
                {...props}
                type='date'
                min={today}
                // onChange={e => onChange(e.target.value)}
                onChange={e => onChange(e.target.value)}
                className={`w-full border border-app-gray h-[50px] px-4 rounded-lg text-sm lg:text-base`}
            />
            </div>
        </>
    )
}
