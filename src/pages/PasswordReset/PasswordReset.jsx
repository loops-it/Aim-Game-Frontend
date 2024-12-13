import React, { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import MainPasswordInput from "../../components/MainPasswordInput";
import MainButton from "../../components/MainButton";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export default function PasswordReset({ title }) {
  document.title = title;

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success message

    try {
      // Retrieve stored OTP and email from localStorage
      const email = localStorage.getItem("otpEmail");
      const otp = localStorage.getItem("otp");
      const password = e.target.password.value;
      const confirm_password = e.target.confirm_password.value;

      // Check if localStorage values exist
      if (!email || !otp) {
        setError(
          "Required information is missing. Please try resending the OTP."
        );
        return;
      }

      // Password validation regex
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

      // Client-side validation
      if (password !== confirm_password) {
        setError("Passwords do not match.");
        return;
      }
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
        );
        return;
      }

      // Prepare payload
      const payload = { email, otp, password };
      console.log("Payload:", payload); // Debug payload structure

      // Show loader (if applicable)
      document.getElementById("page-loader").style.display = "block";

      // Send API request
      const response = await fetch(`${base_url}/api-v1/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Use getItem for consistency
        },
        body: JSON.stringify(payload),
      });

      // Hide loader
      document.getElementById("page-loader").style.display = "none";

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Debugging server error
        setError(errorData.errors || "Invalid OTP or other issue occurred.");
        return;
      }

      // Handle success
      setSuccess("Password reset successful. You may now log in.");
    } catch (err) {
      document.getElementById("page-loader").style.display = "none";
      console.error("Error occurred:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <GuestLayout
      headerText="Reset Password"
      secondaryHeaderText="Enter your new password"
    >
      <form
        className="flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10"
        onSubmit={handleFormSubmit}
      >
        <MainPasswordInput
          name="password"
          label="Password"
          placeholder="Enter Password"
        />
        <MainPasswordInput
          name="confirm_password"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
        />
        {/* Display Error Message */}
        {error && <p className="text-red-500">{error}</p>}
        {/* Display Success Message */}
        {success && <p className="text-green-500">{success}</p>}
        <MainButton className="mt-5">Reset Password</MainButton>
      </form>
    </GuestLayout>
  );
}
