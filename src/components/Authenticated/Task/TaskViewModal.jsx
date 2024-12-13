import React from 'react'
import { Transition } from '@headlessui/react'
import {XCircleIcon,PaperAirplaneIcon} from "@heroicons/react/24/outline";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import MainImageInput from "../../MainImageInput.jsx";
import TaskCommentItem from "./TaskCommentItem.jsx";

// eslint-disable-next-line react/prop-types
export default function TaskViewModal({show, onClose, data}){

    function getColor(){
        if(data?.status === "normal"){
            return 'text-green-500'
        }
        return 'text-red-500'
    }
    return(
        <Transition
            show={show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={'w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#0000006d]'}
        >
            <div className='bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]'>
                <div className='bg-[#C5C5C533] h-14 flex justify-between items-center px-10'>
                    <div className='font-semibold text-app-blue-3 text-2xl'>{data?.name}</div>
                    <button onClick={onClose} className='flex justify-center items-center text-app-gray-3'>
                        <XCircleIcon className='w-7 h-7'/>
                    </button>
                </div>
                <div className='max-h-full grid lg:grid-cols-2 h-[80vh] lg:h-fit overflow-scroll no-scrollbar px-10'>
                    <div className={'pr-5'} >
                        <div className={'font-semibold text-app-blue-3 mt-10'}>Overview</div>
                        <div className={'text-xs text-[#707070]'}>{data?.note}</div>
                        <div className={'bg-[#F8F8F8] mt-10'}>
                            <div className={'flex items-center justify-between px-10 border-b py-5'}>
                                <div>Status</div>
                                <div>
                                    <Chip label={data?.status}/>
                                </div>
                            </div>
                            <div className={'flex items-center justify-between px-10 border-b py-5'}>
                                <div>Priority</div>
                                <div className={`capitalize ${getColor()}`}>
                                    {data?.priority}
                                </div>
                            </div>
                            <div className={'flex items-center justify-between px-10 border-b py-5'}>
                                <div>Assignee</div>
                                <div>
                                    <Avatar sx={{width: 30, height: 30}}
                                            src={"https://mui.com/static/images/avatar/1.jpg"}/>
                                </div>
                            </div>
                            <div className={'flex items-center justify-between px-10 border-b py-5'}>
                                <div>Date</div>
                                <div>
                                    {data?.date}
                                </div>
                            </div>
                        </div>

                        <div className={'mt-10'}>
                            <MainImageInput
                                type="taskView"
                                onChange={file => {}}
                            />
                        </div>
                    </div>
                    <div className={'pl-5 border-l h-full w-full'} >
                        <div className={'font-semibold text-app-blue-3 mt-10'}>Comments</div>
                        <div className={'flex flex-col gap-5 h-[70svh] justify-end pb-4'} >
                            <TaskCommentItem />
                            <TaskCommentItem />
                        </div>
                        <div className={'bg-[#F8F8F8] flex items-center pr-5 rounded-lg w-full overflow-hidden'}>
                            <input placeholder={"Comment Here"}
                                   className={'py-2 px-5 bg-[#F8F8F8] ring-0 outline-none w-full'}/>
                            <PaperAirplaneIcon className={'w-6 h-6 text-[#A2A5B6]'} />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}