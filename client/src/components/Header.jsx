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
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-4 mx-auto max-w-6xl">
        <Link to="/">
          <h1
            className="flex flex-wrap text-sm sm:text-xl font-bold drop-shadow-md
          "
          >
            <span className="text-sky-400 drop-shadow-sm">SriRAM</span>
            <span className="text-black">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 flex justify-between items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent w-24 sm:w-64 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button>
            <FiSearch></FiSearch>
          </button>
        </form>
        <ul className="flex gap-5">
          <Link to="/about">
            <li className="hidden sm:inline">About</li>
          </Link>
          <Link to="/profile">
            <li className="hidden sm:inline">Profile</li>
          </Link>
          <Link to="/sign-up">
            <li className="hidden sm:inline">Sign Up</li>
          </Link>

          <Link to="/profile">
            {currentUserProfile ? (
              <img
                src={currentUserProfile.body.newUser.image}
                className="rounded-full w-7 h-7 object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
