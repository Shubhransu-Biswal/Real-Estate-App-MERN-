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
  const [listingError, setListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [listShowing, setListShowing] = useState(false);
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

  // show listings
  const handleShowListings = async () => {
    try {
      setListingError(false);
      const response = await fetch(
        `/api/v1/users/listings/${currentUser.body.newUser._id}`
      );
      const resData = await response.json();

      if (!response.ok) {
        setListingError(true);
        throw new Error(resData.message);
      }
      setUserListings(resData.body.listings);
      setListShowing((prev) => !prev);
    } catch (err) {
      console.log(err.message);
    }
  };

  // delete listings
  const handleListingDelete = async (listingId) => {
    try {
      const response = await fetch(`/api/v1/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      setUserListings(() =>
        userListings.filter((list) => list._id !== listingId)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // TimeOuts
  if (updateSuccess) {
    setTimeout(() => {
      setUpdateSuccess(false);
      setImageUpload(false);
    }, 5000);
  }

  const hideListing = () => {
    setUserListings([]);
    setListShowing(false);
  };
  return (
    <div className=" flex flex-col justify-center items-center p-20 h-auto space-y-6 w-full bg-[#0d0d0dff] overflow-hidden">
      <h1 className="text-2xl font-bold text-center">Profile</h1>

      <div className="flex flex-col justify-center items-center">
        <img
          onClick={() => imageRef.current.click()}
          src={
            formData.image || currentUser.body.newUser.image
              ? currentUser.body.newUser.image
              : `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png`
          }
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

      <form onSubmit={submitHandler} className="w-[80%] sm:w-[50%] md:w-[40%]">
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
            Create Listing
          </Link>
        </div>
      </form>
      <div className="flex justify-between w-[80%] sm:w-[50%] md:w-[40%]">
        <span onClick={deleteHandler} className="text-red-600 cursor-pointer">
          Delete account
        </span>
        <span onClick={signoutHandler} className="text-red-600 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5"></p>
      <div>
        <p className="text-green-500">
          {updateSuccess ? "Data updated successfully" : ""}
        </p>
        <p className="text-red-500">{error ? error : ""}</p>
      </div>
      <div className="text-center text-green-600 ">
        <button className="mr-2 border-b-2" onClick={handleShowListings}>
          Show Listings
        </button>
        <button
          className={`ml-2 border-b-2 ${listShowing ? "" : "hidden"}`}
          onClick={hideListing}
        >
          Hide Listings
        </button>
      </div>
      <p>{listingError ? "Error showing listings" : ""}</p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-3 text-2xl font-semibold text-white">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4 "
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
