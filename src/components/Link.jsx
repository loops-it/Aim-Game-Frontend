import React from 'react'

export default function Link({ children, href }) {
    return (
        <a href={href} className='text-app-blue font-normal text-sm lg:text-base' >{children}</a>
    )
}
