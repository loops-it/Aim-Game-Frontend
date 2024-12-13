import React from 'react'
import NavigationHeader from '../components/Authenticated/NavigationHeader'

export default function AuthenticatedLayout({ children }) {
    return (
        <div className='bg-[#F8F8F8] min-h-screen relative' >
            <NavigationHeader />
            <div className='p-5 lg:p-10' >{children}</div>
        </div>
    )
}
