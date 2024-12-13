import React from 'react'
import GuestLayout from '../layouts/GuestLayout'
import { getFirstLetters } from '../helpers'
import OutlineButton from '../components/OutlineButton'



const tempData = [
    {
        workspace: "TECXA WORKSPACE",
        url: "tecxaworkspace.Aimgame.com"
    },
    {
        workspace: "BIANRY WORKSPACE",
        url: "binaryworkspace.Aimgame.com"
    }
]

export default function LoginWorkspaceSelect({ title }) {
    document.title = title
    return (
        <GuestLayout
            headerText={"Welcome back"}
            secondaryHeaderText={"Please select you relevant workspace"}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[600px] my-10' >
                {tempData?.map((row, index) => {
                    return (
                        <div className='border border-app-gray p-8' >
                            <div className='flex items-center justify-between' >
                                <div className='flex items-center gap-5' >
                                    <div className='w-12 h-12 flex justify-center items-center bg-app-blue-3 text-white' >{getFirstLetters(row?.workspace)}</div>
                                    <div>
                                        <div className='font-semibold text-lg' >{row?.workspace}</div>
                                        <div className='text-sm font-normal' >{row?.url}</div>
                                    </div>
                                </div>
                                <div>
                                    <OutlineButton>Open</OutlineButton>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='text-center flex flex-col gap-2 text-sm text-app-blue-2' >
                    <div>Not seeing your workspace?</div>
                    <a href='#' className='text-[#9BA9EB]' >Try using a different email</a>
                    <div className='text-app-gray-4' >OR</div>
                    <a href='#' >Create a new workspace</a>
                </div>
            </form>
        </GuestLayout>
    )
}
