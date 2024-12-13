import React, { useState } from "react";
import GuestLayout from "../layouts/GuestLayout";
import MainButton from "../components/MainButton";
import MainInput from "../components/MainInput";
import MainPasswordInput from "../components/MainPasswordInput";
import Link from "../components/Link";
import { useNavigate } from "react-router-dom";
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export default function Register({ title }) {
  document.title = title;

  const [error, setError] = useState(null);
  const navigateTo = useNavigate(); // Move useNavigate inside the component

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirm_password = e.target.confirm_password.value;
      const userRole = "admin";

      // Password validation regex
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

      // Check if passwords match
      if (password !== confirm_password) {
        setError("Passwords do not match");
        return;
      }

      // Check for strong password
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
        );
        return;
      }

      //checking email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        setError("Invalid email format");
        return;
      }

      //checking name format

      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(name)) {
        setError("Invalid name format");
        return;
      }

      console.log(JSON.stringify({ name, email, password, userRole }));
      document.getElementById("page-loader").style.display = "block";

      const response = await fetch(`${base_url}/api-v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, userRole }),
      });

      if (!response.ok) {
        document.getElementById("page-loader").style.display = "none";
        const errorData = await response.json();

        if (
          errorData.errors ===
          "Email Already registered, But OTP is not confirmed"
        ) {
          setError(errorData.errors);
          localStorage.setItem("otpEmail", email);
          localStorage.setItem("verifyType", "admin");
          navigateTo("/password-reset/verify");
        } else {
          setError(errorData.errors);
        }
      } else {
        document.getElementById("page-loader").style.display = "none";
        localStorage.setItem("otpEmail", email);
        localStorage.setItem("verifyType", "admin");
        navigateTo("/password-reset/verify");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <GuestLayout
      headerText={"Register"}
      secondaryHeaderText={
        "We suggest using the email address you use at work."
      }
    >
      <form
        className="flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10"
        onSubmit={handleFormSubmit}
      >
        <MainInput name="name" label={" Name"} placeholder={"Enter Name"} />
        <MainInput
          name="email"
          label={"Email"}
          placeholder={"Enter Email Address"}
          autocomplete={"off"}
        />
        <MainPasswordInput
          name="password"
          label={"Password"}
          placeholder={"Enter Password"}
          autocomplete={"off"}
        />
        <MainPasswordInput
          name="confirm_password"
          label={"Confirm Password"}
          placeholder={"Enter Confirm Password"}
        />

        {error && <p className="text-red-500">{error}</p>}
        <MainButton className="mt-5">{"Register"}</MainButton>

        <span className="text-sm text-center text-[#77787A]">
          Already have a account ?
          <a className="text-app-blue " href={"/"}>
            {" "}
            Sign In
          </a>{" "}
        </span>
      </form>
    </GuestLayout>
  );
}
