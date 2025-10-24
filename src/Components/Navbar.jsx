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
      setUser(currentUser); // Dynamic user state
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
      <div className="navbar-start">
        <div className="flex items-center gap-2">
          <GiSunflower className="text-2xl" />
          <NavLink to="/" className="btn btn-ghost text-xl normal-case">
            Skillswap
          </NavLink>
        </div>
      </div>

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
                src={user.photoURL || "/default-user.png"} // dynamic user photo
                alt={user.displayName || "User"}
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
