import React from "react";
import { Link } from "react-router-dom";
// import { BiSearchAlt } from "react-icons/fa";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-4 mx-auto max-w-6xl">
        <Link to='/'>
        <h1
          className="flex flex-wrap text-sm sm:text-xl font-bold drop-shadow-md
          "
          >
          <span className="text-sky-400 drop-shadow-sm">SriRAM</span>
          <span className="text-black">Estate</span>
        </h1>
            </Link>
        <form className="bg-slate-100">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent w-24 sm:w-64 focus:outline-none"
          />

          {/* <BiSearchAlt></BiSearchAlt> */}
        </form>
        <ul className="flex gap-5">
           <Link to='/about'>
            <li className="hidden sm:inline">About</li>
           </Link>
           <Link to='/profile'>
            <li className="hidden sm:inline">Profile</li>
           </Link>
           <Link to='/sign-in'>
            <li>Sign In</li>
           </Link>
           <Link to='/sign-up'>
            <li className="hidden sm:inline">Sign Up</li>
           </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
