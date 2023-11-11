import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FiSearch } from "react-icons/fi";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUserProfile = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQueary = urlParams.toString();
    navigate(`/search?${searchQueary}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="shadow-md h-auto fixed w-full z-20 backdrop-blur-md">
      <div className="flex justify-between flex-wrap w-full h-full p-4 text-white">
        <Link to="/">
          <h1
            className="flex flex-wrap text-sm sm:text-3xl font-bold drop-shadow-md
          "
          >
            <span className="text-sky-400 [text-shadow:_2px_3px_4px_black]">
              D
            </span>
            <span className="text-white rotate-180 [text-shadow:_2px_3px_4px_black]">
              D
            </span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 flex justify-between items-center rounded"
        >
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent w-40 sm:w-56 md:w-80 focus:outline-none py-0 px-1 sm:p-1 text-[#0d0d0dff] "
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button className="mr-2 text-black">
            <FiSearch></FiSearch>
          </button>
        </form>
        <ul className="flex gap-5">
          <Link to="/">
            <li className="[text-shadow:_2px_3px_3px_black]">Home</li>
          </Link>
          <Link to="/about">
            <li className="[text-shadow:_2px_3px_3px_black]">About</li>
          </Link>
          <Link to="/profile">
            <li className="[text-shadow:_2px_3px_3px_black]">Profile</li>
          </Link>
          <Link to="/sign-up">
            <li className="[text-shadow:_2px_3px_3px_black]">Sign Up</li>
          </Link>

          <Link to="/profile">
            {currentUserProfile ? (
              <img
                src={
                  currentUserProfile.body.newUser.image
                    ? currentUserProfile.body.newUser.image
                    : `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png`
                }
                className="rounded-full w-7 h-7 object-cover"
              />
            ) : (
              <li className="[text-shadow:_2px_3px_3px_black]">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
