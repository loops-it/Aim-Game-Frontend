import React from 'react'

export default function MainTextArea({ label, ...props }) {
    return (
        <div>
            <label className='text-app-blue-2 font-normal text-sm lg:text-base' >{label}</label>
            <textarea
                rows={5}
                {...props}
                className='w-full border placeholder:text-sm border-app-gray px-4 py-4 rounded-lg mt-2 text-sm lg:text-base'
            />
        </div>
    )
}
