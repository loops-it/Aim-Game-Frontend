import React from 'react';
import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function TableProvider({ data, loading, emptyMessage, children, pagination, className, itemsPerPage, currentPage, setCurrentPage }) {
    if (loading) {
        return (
            <div className='flex flex-col justify-center items-center text-app-blue font-semibold text-sm py-20 gap-3'>
                <ArrowPathIcon className='w-16 animate-spin' />
            </div>
        );
    }

    if (data?.length === 0) {
        return (
            <div className='flex flex-col justify-center items-center text-app-blue font-semibold text-sm py-20 gap-3'>
                <img src="/icons/empty.png" className='w-32' />
                <div>{emptyMessage}</div>
            </div>
        );
    }

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="overflow-x-auto relative">
            <table className={`${className} w-full text-sm text-left text-gray-500`}>
                {children}
            </table>

            {pagination && itemsPerPage && data.length > 0 && totalPages > 1 &&
                <div className='flex items-center gap-2 justify-end mt-5 pr-4 pb-5'>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5`} width="13.503" height="23.619" viewBox="0 0 13.503 23.619">
                            <path d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z" transform="translate(-11.251 -6.194)" fill={`${currentPage === 1 ? "#6D6A6A" : "#30385E"}`} />
                        </svg>
                    </button>
                    <div>{currentPage}</div>
                    <div>of</div>
                    <div>{totalPages}</div>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5`} width="13.503" height="23.616" viewBox="0 0 13.503 23.616">
                            <path d="M20.679,18,11.742,9.07a1.681,1.681,0,0,1,0-2.384,1.7,1.7,0,0,1,2.391,0L24.258,16.8a1.685,1.685,0,0,1,.049,2.327L14.14,29.32a1.688,1.688,0,0,1-2.391-2.384Z" transform="translate(-11.246 -6.196)" fill={`${currentPage === totalPages ? "#6D6A6A" : "#30385E"}`} />
                        </svg>
                    </button>
                </div>
            }
        </div >
    );
}
