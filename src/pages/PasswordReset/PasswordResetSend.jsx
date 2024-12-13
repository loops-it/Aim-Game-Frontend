import React, { useState } from 'react';
import GuestLayout from '../../layouts/GuestLayout'
import MainInput from '../../components/MainInput'
import MainButton from '../../components/MainButton'
import { useNavigate } from 'react-router-dom';
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export default function PasswordResetSend({ title }) {
    document.title = title;
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            document.getElementById("page-loader").style.display = 'block';
            const email = e.target.email.value.trim();

            console.log(JSON.stringify({email}));
 
            const response = await fetch(`${base_url}/api-v1/auth/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.accessToken}`,
                },
                
                body: JSON.stringify({email}),
            });

            if (!response.ok) {
                document.getElementById("page-loader").style.display = 'none';
                const errorData = await response.json();
                setError(errorData.errors);
            } else {
                document.getElementById("page-loader").style.display = 'none';
                // const data = await response.json();
                localStorage.setItem('otpEmail', email);
                localStorage.setItem('verifyType', 'reset');
                navigateTo('/password-reset/verify');
            }
        } catch (error) {
            document.getElementById("page-loader").style.display = 'none';
            console.error('Error occurred:', error);
            setError(error.message);
        }
    };

    return (
        <GuestLayout
            headerText={"Forgot Password ?"}
            secondaryHeaderText={"Don't worry! It happens. Please enter the address associated with your workspace account"}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' onSubmit={handleFormSubmit} >
                <MainInput
                    name="email"
                    label={"Email"}
                    placeholder={"Enter Email Address"}
                />
                {error && <p className="text-red-500">{error}</p>}
                <MainButton
                    className="mt-5"
                >{"Send Link"}</MainButton>
            </form>
        </GuestLayout>
    )
}
