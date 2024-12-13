import React from 'react'
import CreateWorkshopLayout from '../../layouts/CreateWorkshopLayout'
import MainButton from '../../components/MainButton'
import MainInput from '../../components/MainInput'
import MainPasswordInput from '../../components/MainPasswordInput'

export default function CreateWorkspacePersonal({ title }) {
    document.title = title
    return (
        <CreateWorkshopLayout
            headerText={"Sign Up"}
            secondaryHeaderText={"Create you account"}
            stepText="Step 1 of 3"
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-7' >
                <MainInput
                    label={"Email"}
                    placeholder={"Enter Email Address"}
                />
                <MainPasswordInput
                    label={"Password"}
                    placeholder={"Enter Password"}
                />
                <MainPasswordInput
                    label={"Confirm Password"}
                    placeholder={"Enter Confirm Password"}
                />
                <MainButton
                    className="mt-5"
                >{"Continue"}</MainButton>

                <span className='text-sm text-center text-[#77787A]' ><a className='text-app-blue ' href={"#"} >By continuing your agree to our Customer Terms and Condition.</a> User Terms of service ,Privacy Policy</span>
            </form>
        </CreateWorkshopLayout>
    )
}
