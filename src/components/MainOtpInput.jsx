import React, { useState, useRef } from 'react';

export default function MainOtpInput({ onOtpChange, onOtpComplete }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleInputChange = (index, event) => {
        const value = event.target.value;

        if (isNaN(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < otp.length - 1 && value !== '') {
            inputRefs.current[index + 1].focus();
        }

        // Call onOtpComplete when the last input is filled
        if (index === otp.length - 1 && value !== '') {
            onOtpComplete(newOtp.join(''));
        }
    };

    const handleInputPaste = (event) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text/plain');

        if (/^\d+$/.test(pastedData) && pastedData.length === otp.length) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);

            // Automatically call onOtpComplete if the entire OTP is pasted
            onOtpComplete(newOtp.join(''));

            // Focus the last input field
            inputRefs.current[otp.length - 1].focus();
        }
    };

    const handleInputKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className='flex justify-between items-center w-full'>
            {otp.map((digit, index) => (
                <React.Fragment key={index}>
                    <div
                        className='w-12 h-12 lg:w-14 lg:h-14 border-2 rounded-lg flex justify-center items-center'
                    >
                        <input
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            type="text"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e)}
                            onKeyDown={(e) => handleInputKeyDown(index, e)}
                            onPaste={handleInputPaste}
                            maxLength={1}
                            className='w-full pl-4 lg:pl-5 h-full bg-transparent'
                        />
                    </div>
                    {index === 2 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D0D0D0" className="w-4 h-4 lg:w-6 lg:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>}
                </React.Fragment>
            ))}
        </div>
    );
};
