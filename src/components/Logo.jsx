import React from 'react'

export default function Logo({ type }) {
    if (type == "small") {
        return (
            <img src='/images/logo.png' className='w-[250px] object-contain' />
        )
    }
    return (
        <img src='/images/logo.png' className='w-[300px] object-contain' />
    )
}
