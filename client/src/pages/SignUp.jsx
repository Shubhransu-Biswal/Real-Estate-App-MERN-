// src/Signup.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Oauth from "../components/Oauth";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setFormData((data) => {
      return {
        ...formData,
        [e.target.id]: e.target.value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    isLoading(true);
    const response = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      isLoading(false);
      setError(responseData.message);
      throw new Error(responseData.message);
    }
    isLoading(false);
    navigate("/sign-in");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0dff] ">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            onChange={inputHandler}
            id="userName"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={inputHandler}
            id="email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={inputHandler}
            id="password"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded flex justify-center items-center">
          {loading ? "Signing up..." : "Sign up with Email"}
          <MdEmail className="text-[2rem] ml-5 text-red-700"></MdEmail>
        </button>
        <Oauth></Oauth>
        {error && <p>{error}</p>}
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
