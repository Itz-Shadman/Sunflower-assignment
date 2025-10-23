import React, { useEffect, useState } from "react";
import { GiSunflower } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm w-[90%] mx-auto">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <GiSunflower className="text-2xl" />
          <a className="btn btn-ghost text-xl normal-case">Skillswap</a>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          <>
            <NavLink to="/login" className="btn gap-2">
              <CiLogin /> Login
            </NavLink>
            <NavLink to="/signup" className="btn btn-outline ml-2">
              Signup
            </NavLink>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="tooltip tooltip-bottom" data-tip={user.displayName || user.email}>
              <img
                src={user.photoURL || "https://i.postimg.cc/3x3QYVvF/user-avatar.png"}
                alt={user.displayName}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary cursor-pointer"
              />
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
