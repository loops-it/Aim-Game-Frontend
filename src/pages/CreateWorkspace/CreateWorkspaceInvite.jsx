import React from 'react'
import CreateWorkshopLayout from '../../layouts/CreateWorkshopLayout'
import MainButton from '../../components/MainButton'
import MainTextArea from '../../components/MainTextArea'

export default function CreateWorkspaceInvite({ title }) {
    document.title = title
    return (
        <CreateWorkshopLayout
            headerText={`Who else in on the company_name team ?`}
            secondaryHeaderText={"Add your team members"}
            stepText="Step 3 of 3"
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-7' >
                <MainTextArea
                    label={"Add teammate by email"}
                    placeholder={"Separate with a coma Example:user1@test.com,user2@test.com"}
                />
                <MainButton
                    className="mt-5"
                >{"Send Invitation"}</MainButton>
                <div className='text-app-blue text-center font-normal text-sm lg:text-base' >Skip this Step</div>
            </form>
        </CreateWorkshopLayout>
    )
}
