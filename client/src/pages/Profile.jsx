import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  updatingStart,
  updatingSuccess,
  updatingFailed,
  signinStart,
  signinSuccess,
  signinFailed,
  deletingFailed,
  deletingStart,
  deletingSuccess,
  signingoutStart,
  signingoutSuccess,
} from "../redux/slices/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const { error, loading } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  const imageRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // timeout useStates
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUpload(true);
          return setFormData((data) => ({
            ...currentUser.body.newUser,
            image: downloadURL,
          }));
        });
      }
    );
  };

  // update handler
  const updateHandler = (e) => {
    setFormData((data) => ({
      ...currentUser.body.newUser,
      [e.target.id]: e.target.value,
    }));
  };
  // submitting
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatingStart());
      // sending request
      const response = await fetch(
        `/api/v1/users/update/${currentUser.body.newUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // throwing error if response error
      if (!response.ok) {
        throw new Error(response.message);
      }

      // extracting json data
      const resData = await response.json();
      dispatch(updatingSuccess(resData));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updatingFailed(err.message));
    }
  };

  // delete and signout
  console.log(currentUser);
  const deleteHandler = async (e) => {
    try {
      // dispatch(deletingStart());
      const response = await fetch(
        `/api/v1/users/delete/${currentUser.body.newUser._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
      dispatch(deletingSuccess());
    } catch (err) {
      console.log(err.message);
      dispatch(deletingFailed(err.message));
    }
  };
  const signoutHandler = async (e) => {
    try {
      dispatch(signingoutStart());
      const response = await fetch(`/api/v1/auth/signout`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      dispatch(signingoutSuccess());
    } catch (err) {
      console.log(err.message);
      dispatch(signinFailed(err.message));
    }
  };

  // TimeOuts
  if (updateSuccess) {
    setTimeout(() => {
      setUpdateSuccess(false);
      setImageUpload(false);
    }, 5000);
  }
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Profile</h1>

      <div className="flex flex-col justify-center items-center">
        <img
          onClick={() => imageRef.current.click()}
          src={formData.image || currentUser.body.newUser.image}
          alt="Profile"
          className="w-32 h-32 rounded-full cursor-pointer"
        />
        <div>
          {fileUploadError ? (
            <span>Error Occured</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-500">{`uploading ${filePerc}% ...`}</span>
          ) : filePerc === 100 ? (
            <span className={imageUpload ? "text-green-500" : "hidden"}>
              File uploaded successfully press save to change
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="space-y-4">
          <div>
            <input
              type="file"
              name=""
              id=""
              ref={imageRef}
              hidden
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Username"
              defaultValue={currentUser.body.newUser.userName}
              onChange={updateHandler}
              id="userName"
            />
          </div>

          <div>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              placeholder="Email"
              defaultValue={currentUser.body.newUser.email}
              onChange={updateHandler}
              id="email"
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full border rounded-lg p-2"
              placeholder="Password"
              onChange={updateHandler}
              id="password"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={loading}
            type="submit"
            className="disabled:bg-blue-300 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <Link
            className=" block mt-4 text-center disabled:bg-blue-300 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            to="/create-listing"
          >
            listing page
          </Link>
        </div>
      </form>
      <div className="flex justify-between">
        <span onClick={deleteHandler} className="text-red-600 cursor-pointer">
          Delete account
        </span>
        <span onClick={signoutHandler} className="text-red-600 cursor-pointer">
          Sign out
        </span>
      </div>
      <div>
        <p className="text-green-500">
          {updateSuccess ? "Data updated successfully" : ""}
        </p>
        <p className="text-red-500">{error ? error : ""}</p>
      </div>
    </div>
  );
};

export default Profile;
