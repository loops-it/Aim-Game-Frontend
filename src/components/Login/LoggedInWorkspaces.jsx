import React from 'react'
import OutlineButton from '../OutlineButton'
import {getFirstLetters} from '../../helpers'

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

export default function LoggedInWorkspaces() {
    return (
        <div className='w-[90%] lg:w-[600px]' >
            <div className='text-center text-app-blue mb-3' >You're already signed in to…</div>
            <div className='border border-app-gray p-8' >
                {tempData?.map((row, index) => {
                    return (
                        <div className='flex items-center justify-between mb-5' >
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
                    )
                })}
            </div>
        </div>
    )
}
