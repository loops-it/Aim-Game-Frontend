import React from 'react'
import GuestLayout from '../layouts/GuestLayout'
import MainButton from '../components/MainButton'
import MainInput from '../components/MainInput'
import Link from '../components/Link'
import LoggedInWorkspaces from '../components/Login/LoggedInWorkspaces'


export default function LoginWorkspace({ title }) {
    document.title = title
    return (
        <GuestLayout
            headerText={"Sign in to your Organization"}
            secondaryHeaderText={"Enter your workspace's AimGame URL"}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] my-10' >
                <MainInput
                    placeholder={"your-workspace.aimgame.com"}
                />
                <MainButton
                    className="mt-5"
                >{"Continue"}</MainButton>
                <div className='flex flex-col gap-2 mt-7' >
                    <span className='text-app-gray-4 text-sm lg:text-base' >Don't know your workspace URL? <Link href={"#"} >Find workspaces</Link></span>
                    <span className='text-app-gray-4 text-sm lg:text-base lg:whitespace-nowrap' >Looking to create a workspace? <Link href={"#"} >Create a new workspace</Link></span>
                </div>
            </form>

            <LoggedInWorkspaces />
        </GuestLayout>
    )
}
