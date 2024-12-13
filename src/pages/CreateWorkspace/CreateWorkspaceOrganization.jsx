import React from 'react'
import CreateWorkshopLayout from '../../layouts/CreateWorkshopLayout'
import MainInput from '../../components/MainInput'
import MainButton from '../../components/MainButton'
import MainSelect from '../../components/MainSelect'
import MainCheckbox from '../../components/MainCheckbox'


const industryTypes = [
    { id: 1, name: 'Transport' },
    { id: 2, name: 'Logistics' },
    { id: 3, name: 'ICT' },
    { id: 4, name: 'Telecommunication' },
]

export default function CreateWorkspaceOrganization({ title }) {
    document.title = title
    return (
        <CreateWorkshopLayout
            headerText={"Create Your Organization"}
            secondaryHeaderText={"Please provide relevant details"}
            stepText="Step 2 of 3"
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-7' >
                <MainInput
                    label={"Business Name"}
                    placeholder={"Enter Business Address"}
                />
                <MainInput
                    label={"Business Address"}
                    placeholder={"Enter Business Address"}
                />
                <MainInput
                    label={"Business Contact Number"}
                    placeholder={"Enter Business Contact Number"}
                />
                <MainSelect
                    label={"Industry Type"}
                    placeholder={"Please Select Industry Type"}
                    options={industryTypes}
                />
                <MainCheckbox
                    id={"termsCheck"}
                    title={"I agree to all Terms ,Privacy Policy and Fees"}
                />
                <MainButton
                    className="mt-5"
                >{"Continue"}</MainButton>

                <span className='text-sm text-center text-[#77787A]' ><a className='text-app-blue ' href={"#"} >By continuing your agree to our Customer Terms and Condition.</a> User Terms of service ,Privacy Policy</span>
            </form>
        </CreateWorkshopLayout>
    )
}
