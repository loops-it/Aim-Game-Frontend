import React, { useState } from 'react';
import GuestLayout from '../../layouts/GuestLayout'
import MainOtpInput from '../../components/MainOtpInput'
import MainButton from '../../components/MainButton'
import { useNavigate } from 'react-router-dom';
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export default function PasswordResetVerify({title}) {
    document.title = title;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [otp, setOtp] = useState('');
    const navigateTo = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            document.getElementById("page-loader").style.display = 'block';
            const email = localStorage.otpEmail;

            console.log(JSON.stringify({email, otp}));
            
            const response = await fetch(`${base_url}/api-v1/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.accessToken}`,
                },
                
                body: JSON.stringify({email, otp}),
            });

            if (!response.ok) {
                document.getElementById("page-loader").style.display = 'none';
                const errorData = await response.json();
                setError(errorData.errors);
                setSuccess("");
            } else {
                document.getElementById("page-loader").style.display = 'none';
                const verifyType = localStorage.verifyType;
                if(verifyType == "admin"){
                    navigateTo('/');
                }
                else{
                    localStorage.setItem('otp', otp);
                    navigateTo('/password-reset');
                }
                
            }
        } catch (error) {
            document.getElementById("page-loader").style.display = 'none';
            console.error('Error occurred:', error);
            setError(error.message);
            setSuccess("");
        }
    };

    const resendOtp = async (e) => {
        e.preventDefault();

        try {
            const email = localStorage.otpEmail;

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
                const errorData = await response.json();
                setError(errorData.errors);
                setSuccess("");
            } else {
                setError('');
                setSuccess("OTP has been resent");
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setError(error.message);
            setSuccess("");
        }
    }; 
    return (
        <GuestLayout
            headerText={"Check your email for a code"}
            secondaryHeaderText={`We've sent a 6-digit code to ${localStorage.otpEmail}. The code expires shortly, please enter it soon`}
        >
            <form className='flex flex-col  gap-5 w-[90%] lg:w-[450px] mt-10' onSubmit={handleFormSubmit} >
                <MainOtpInput
                    onOtpComplete={(value) => setOtp(value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <MainButton
                    className="mt-5"
                >{"Send OTP"}</MainButton>
               
            </form>
            <form className='flex flex-col items-center justify-center gap-5 w-[90%] lg:w-[400px] mt-10' >
                <div className='flex flex-col justify-center items-center text-center' >
                    <div className='text-sm lg:text-base' >Can't find your code? Check your spam folder!</div>
                    <button className='text-app-blue' onClick={resendOtp}>Resend</button>
                </div>
            </form>
        </GuestLayout>
    )
}
