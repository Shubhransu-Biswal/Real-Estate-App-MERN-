import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const imageRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
        console.log(progress);
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, image: downloadURL })
        );
      }
    );
  };

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
            <span className="text-green-400">{`uploading ${filePerc} ...`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-400">File uploaded successfully✔</span>
          ) : (
            ""
          )}
        </div>
      </div>

      <form>
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
            />
          </div>

          <div>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full border rounded-lg p-2"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="flex justify-between">
        <span className="text-red-600 cursor-pointer">Delete account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
