import React from 'react';
import { menuData } from '../../constantData';
import HeaderUser from './HeaderUser';
import HeaderNotification from './HeaderNotification';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavigationHeader() {
    const { pathname } = useLocation();
    const navigateTo = useNavigate();
    // Define the logout function
    const handleLogout = () => {
        localStorage.setItem('accessToken', false);
        localStorage.setItem('userID', false);
        localStorage.setItem('userRole', false);
        localStorage.setItem('userName', false);

        navigateTo('/');
    };

    return (
        <div className='h-20 bg-white shadow-lg flex items-center justify-between px-5 lg:px-10'>
            <div className='items-center gap-10 flex'>
                <a href='/dashboard'>
                    <img src='/images/logo-home.png' className='h-14' alt="Logo" />
                </a>
                <div className='hidden lg:flex items-center gap-6 text-sm'>
                    {menuData?.map((row, index) => {
                        return (
                            <a 
                                href={row?.href} 
                                className={`cursor-pointer relative h-14 flex justify-center items-center`} 
                                key={index}
                            >
                                {row?.title}
                                {pathname === row?.href && (
                                    <div className='absolute bottom-2 w-full h-[2px] bg-app-yellow'></div>
                                )}
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-5'>
                <a onClick={handleLogout} href="#">
                    <img src='/icons/turn-off.png' className='h-5' alt="Turn Off" />
                </a>
                {/* <HeaderNotification /> */}
                <HeaderUser />
            </div>
        </div>
    );
}
