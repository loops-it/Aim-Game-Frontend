import React, { useState } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import MainInput from '../components/MainInput'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import TaskCard from "../components/Authenticated/Task/TaskCard.jsx";
import TaskViewModal from "../components/Authenticated/Task/TaskViewModal.jsx";
import { useEffect } from 'react';
import api from '../services/api'



// const tempData = [
//     {
//         title: "Server Room Upgrade",
//         description: "To get the most value from a server room upgrade, it’s important to develop a plan of action. The first step is to identify any deficiencies in the current infrastructure.",
//         status: "inProgress",
//         priority: "high",
//         assignee: "Test User",
//         date: "05/21/2023",
//         attachments: [],
//         comments: [],
//     },
//     {
//         title: "Server Room Upgrade",
//         description: "To get the most value from a server room upgrade, it’s important to develop a plan of action. The first step is to identify any deficiencies in the current infrastructure.",
//         status: "inProgress",
//         priority: "high",
//         assignee: "Test User",
//         date: "05/21/2023",
//         attachments: [],
//         comments: [],
//     }
// ]

export default function Tasks() {

    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [tempData, setTempData] = useState(null);
    const [searchValue, setSearchValue] = useState([]);

    // tasks data
    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                document.getElementById("page-loader").style.display = 'block';
                const response = await api.get('/api-v1/tasks');
                setTempData(response.data.data);
                document.getElementById("page-loader").style.display = 'none';
            } catch (error) {
                console.error('Error fetching workspaces:', error);
                document.getElementById("page-loader").style.display = 'none';
            }
        };

        fetchWorkspaces();
    }, []);
    console.log("tasks data : ", selectedData);


    const fetchSearchResults = async () => {
        if (searchValue.trim() !== '') {
            try {
                const response = await api.get(`/api-v1/tasks/${searchValue}`);
                const data = response.data.data;
                console.log('Search results:', data);
            } catch (error) {
                console.error('Error fetching data by id:', error);
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <div className='flex justify-between gap-5 items-center' >
                <div className='flex flex-col gap-1' >
                    <div className='flex items-center gap-1 font-semibold' >
                        <span className='text-app-blue-2' >Tasks</span>
                    </div>
                    <div className='h-1 w-[70%] bg-app-yellow' ></div>
                </div>
                <div className='w-[30%] relative flex items-center' >
                    {/* <MainInput
                        placeholder={"Search Task"}
                        
                    /> */}
                    <input
                        type="search"
                        placeholder='Search'
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`w-full border border-app-gray h-[50px] px-4 rounded-lg text-sm lg:text-base`}
                    />
                    <MagnifyingGlassIcon onClick={fetchSearchResults} className='text-[#A6A9B9] w-5 h-5 absolute right-5' />
                </div>
            </div>
            <div className='bg-white shadow-lg w-full px-10 py-10 mt-10'>
                <div className='grid lg:grid-cols-3 gap-10'>
                    <div>
                        <div className='flex items-center gap-2 uppercase text-sm font-semibold'>
                            <div className='w-4 h-4 rounded-full bg-[#707070]'></div>
                            <div>To Do</div>
                        </div>
                        <div className={'rounded-lg overflow-hidden mt-8 text-white bg-white shadow-lg'}>
                            <div className={'flex justify-between items-center bg-[#818FD1] px-5 py-3 mb-10'}>
                                <div className={'font-semibold text-lg'}>Opportunity Identification</div>
                                <div>Dec 05 2023</div>
                            </div>
                            <div className={'flex flex-col gap-5'}>
                                {tempData
                                    ?.filter((row) => row.status === "Pending")
                                    .map((row, index) => (
                                        <TaskCard
                                            key={index}
                                            name={row.name}
                                            date={row.date}
                                            onClick={() => {
                                                setSelectedData(row);
                                                setShow(true);
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-2 uppercase text-sm font-semibold'>
                            <div className='w-4 h-4 rounded-full bg-[#9AC8F1]'></div>
                            <div>In Progress</div>
                        </div>
                        <div className={'rounded-lg overflow-hidden mt-8 text-white bg-white shadow-lg'}>
                            <div className={'flex justify-between items-center bg-[#81D189] px-5 py-3 mb-10'}>
                                <div className={'font-semibold text-lg'}>Opportunity Identification</div>
                                <div>Dec 05 2023</div>
                            </div>
                            <div className={'flex flex-col gap-5'}>
                            {tempData
                                    ?.filter((row) => row.status === "InProgress")
                                    .map((row, index) => (
                                        <TaskCard
                                            key={index}
                                            name={row.name}
                                            date={row.date}
                                            onClick={() => {
                                                setSelectedData(row);
                                                setShow(true);
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-2 uppercase text-sm font-semibold'>
                            <div className='w-4 h-4 rounded-full bg-[#148E28]'></div>
                            <div>Completed</div>
                        </div>
                        <div className={'rounded-lg overflow-hidden mt-8 text-white bg-white shadow-lg'}>
                            <div className={'flex justify-between items-center bg-[#A8B0D7] px-5 py-3 mb-10'}>
                                <div className={'font-semibold text-lg'}>Opportunity Identification</div>
                                <div>Dec 05 2023</div>
                            </div>
                            <div className={'flex flex-col gap-5'}>
                            {tempData
                                    ?.filter((row) => row.status === "Completed")
                                    .map((row, index) => (
                                        <TaskCard
                                            key={index}
                                            name={row.name}
                                            date={row.date}
                                            onClick={() => {
                                                setSelectedData(row);
                                                setShow(true);
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button onClick={() => { }}
                    className='flex items-center mt-10 gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white'>
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>New Task</div>
                </button> */}
            </div>
            <TaskViewModal
                data={selectedData}
                show={show}
                onClose={() => setShow(false)}
            />
        </AuthenticatedLayout>
    )
}
