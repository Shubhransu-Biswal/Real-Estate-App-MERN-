import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FiSearch } from "react-icons/fi";
import default_user from "../assets/default_user.png";
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
    <header className="shadow-md h-auto fixed w-full z-20 backdrop-blur-md bg-slate-900/50">
      <div className="flex justify-between flex-wrap w-full h-full p-4 text-white">
        <Link to="/" className="m-1">
          <h1
            className="flex flex-wrap text-lg sm:text-3xl font-bold drop-shadow-md
          "
          >
            <span className="text-[#f2b700ff] [text-shadow:_2px_3px_4px_black]">
              D
            </span>
            <span className="text-white rotate-180 [text-shadow:_2px_3px_4px_black]">
              D
            </span>
          </h1>
        </Link>
        <div className="flex flex-wrap justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 rounded mr-2 px-2 w-40 sm:w-56 md:w-72 h-7 flex justify-center items-center relative m-1"
          >
            <input
              type="text"
              placeholder="Search..."
              className=" bg-transparent focus:outline-none text-[#0d0d0dff] absolute w-[82%] left-[5%] "
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button className="text-black absolute w-[10%] right-[2%]">
              <FiSearch></FiSearch>
            </button>
          </form>
          <ul className="flex gap-5 flex-wrap">
            <Link to="/">
              <li
                className="
                font-bold
                [text-shadow:_2px_3px_3px_black] hover:[text-shadow:_1px_1px_3px_black] transition-all"
              >
                Home
              </li>
            </Link>
            <Link to="/about">
              <li
                className="
                font-bold
                 [text-shadow:_2px_3px_3px_black] hover:[text-shadow:_1px_1px_3px_black] transition-all"
              >
                About
              </li>
            </Link>
            {currentUserProfile && (
              <Link to="/profile">
                <li
                  className="
                font-bold
                [text-shadow:_2px_3px_3px_black] hover:[text-shadow:_1px_1px_3px_black] transition-all"
                >
                  Profile
                </li>
              </Link>
            )}
            {!currentUserProfile && (
              <Link to="/sign-up">
                <li
                  className="
                  font-bold
                  [text-shadow:_2px_3px_3px_black] hover:[text-shadow:_1px_1px_3px_black] transition-all"
                >
                  Sign Up
                </li>
              </Link>
            )}

            <Link to="/profile">
              {currentUserProfile ? (
                <img
                  src={
                    currentUserProfile.body.newUser.image
                      ? currentUserProfile.body.newUser.image
                      : default_user
                  }
                  className="rounded-full w-7 h-7 object-cover"
                />
              ) : (
                <li
                  className="
                font-bold
                [text-shadow:_2px_3px_3px_black] hover:[text-shadow:_1px_1px_3px_black] transition-all"
                >
                  Sign In
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
