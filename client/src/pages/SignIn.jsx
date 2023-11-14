// src/Signup.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import {
  signinStart,
  signinFailed,
  signinSuccess,
} from "../redux/slices/userSlice";
import Oauth from "../components/Oauth";
import bgImage from "../assets/image-1.jpg";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { error, loading, currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(signinStart());
    const response = await fetch("/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      dispatch(signinFailed(responseData));
      setError(responseData.message);
      throw new Error(responseData.message);
    }
    dispatch(signinSuccess(responseData));
    navigate("/profile");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={submitHandler}
        className=" bg-black/20 p-8 rounded shadow-md w-96 backdrop-blur-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
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
        <button className="w-full bg-blue-500 text-white py-3 rounded flex justify-center items-center">
          {loading ? "Signing in..." : "Sign in with Email"}{" "}
          {/* <MdEmail className="text-[2rem] ml-5 text-red-700"></MdEmail> */}
        </button>
        <Oauth></Oauth>
        {error && <p>{error}</p>}
        <p className="mt-4 text-gray-300 text-sm">
          Dont have an account?{" "}
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
