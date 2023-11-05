import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Profile</h1>

      <div className="flex justify-center">
        <img
          src={currentUser.body.newUser.image}
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
      </div>

      <form>
        <div className="space-y-4">
          <div>
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
