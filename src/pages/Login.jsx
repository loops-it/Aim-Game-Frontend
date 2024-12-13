import React, { useState } from 'react';
import GuestLayout from '../layouts/GuestLayout';
import MainButton from '../components/MainButton';
import MainInput from '../components/MainInput';
import MainPasswordInput from '../components/MainPasswordInput';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export default function Login({ title }) {
    document.title = title;

    const [error, setError] = useState(null);
    const navigateTo = useNavigate(); // Move useNavigate inside the component

    const handleFormSubmit = async (e) => {
        e.preventDefault();

            // const email = e.target.email.value;
            // const password = e.target.password.value;
        
            // console.log(JSON.stringify({ email, password }));
            // const response = await api.post('/api-v1/auth/login', {
            //     email,
            //     password
            // });
            //  console.log(response);
            // if (response.data.code == 200) {
            //     // console.log(response.data);
            //     console.log('Login successful');
            //     const data = response.data;
            //     localStorage.setItem('accessToken', data.token);
            //     localStorage.setItem('userID', data.userID);
            //     localStorage.setItem('userRole', data.userRole);
            //     navigateTo('/dashboard');
            // } else {
            //     console.log(response.data);
            // }
 
        
        try {
            document.getElementById("page-loader").style.display = 'block';
            const email = e.target.email.value.trim();
            const password = e.target.password.value.trim();

            console.log(JSON.stringify({ email, password }));

            const response = await fetch(`${base_url}/api-v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                document.getElementById("page-loader").style.display = 'none';
                const errorData = await response.json();
                setError(errorData.msg);
            } else {
                document.getElementById("page-loader").style.display = 'none';
                const data = await response.json();
                localStorage.setItem('accessToken', data.token);
                localStorage.setItem('userID', data.userID);
                localStorage.setItem('userRole', data.userRole);
                localStorage.setItem('userName', data.userName);
                navigateTo('/dashboard');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setError('An unexpected error occurred.');
        }
    };

    const [rememberMe, setRememberMe] = useState(false);

    const handleCheckboxChange = (event) => {
        setRememberMe(event.target.checked);
        localStorage.setItem('remember', true);
    };

    return (
        <GuestLayout
            headerText={"Sign In"}
            secondaryHeaderText={"We suggest using the email address you use at work."}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' onSubmit={handleFormSubmit}>
                <MainInput
                    name="email"
                    label={"Email"}
                    placeholder={"Enter Email Address"}
                />
                <MainPasswordInput
                    name="password"
                    label={"Password"}
                    placeholder={"Enter Password"}
                />
             <div className='flex justify-between w-full items-center'>
                <div className='flex items-center'>
                    <input
                        type='checkbox'
                        id='rememberMe'
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                        className='mr-2'
                    />
                    <label htmlFor='rememberMe'>Remember me</label>
                </div>
                <div>
                    <Link href={"/password-reset/send"}>{"Forget Password?"}</Link>
                </div>
            </div>
               
                {error && <p className="text-red-500">{error}</p>}
                <MainButton className="mt-5">{"Sign in"}</MainButton>

                <span className='text-sm text-center text-[#77787A]' >Don't have a  account?<a className='text-app-blue ' href={"/register"} > Register</a> </span>
            </form>
        </GuestLayout>
    );
}
