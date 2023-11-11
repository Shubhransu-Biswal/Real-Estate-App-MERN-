import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const userData = {
        userName: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };

      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const resData = await res.json();
      dispatch(signinSuccess(resData));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full bg-red-600 text-white py-2 rounded mt-3"
    >
      Sign up with google
    </button>
  );
};

export default Oauth;
