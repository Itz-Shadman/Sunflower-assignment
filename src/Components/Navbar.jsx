import React, { useEffect, useState } from "react";
import { GiSunflower } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      // console.error(error.message);
    }
  };
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <GiSunflower className="text-2xl text-yellow-500" />
            <NavLink to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Skillswap
            </NavLink>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <NavLink to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Home</NavLink>
            <NavLink to="/profile" className="text-blue-600 hover:text-blue-700 transition-colors">Profile</NavLink>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {!user ? (
              <>
                <NavLink to="/login" className="btn btn-sm gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <CiLogin /> Login
                </NavLink>
                <NavLink to="/signup" className="btn btn-sm btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  Signup
                </NavLink>
              </>
            ) : (
              <div className="relative group">
                <img
                  src={user.photoURL || "/default-user.png"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="px-4 py-2 text-sm text-blue-600">{user.displayName || user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-blue-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 bg-white shadow-md">
          <NavLink to="/" className="block py-2 text-blue-600 hover:text-blue-700 transition-colors">Home</NavLink>
          <NavLink to="/profile" className="block py-2 text-blue-600 hover:text-blue-700 transition-colors">Profile</NavLink>
          {!user ? (
            <>
              <NavLink to="/login" className="block py-2 text-blue-600 hover:text-blue-700 transition-colors">Login</NavLink>
              <NavLink to="/signup" className="block py-2 text-blue-600 hover:text-blue-700 transition-colors">Signup</NavLink>
            </>
          ) : (
            <>
              <p className="py-2 text-blue-600">{user.displayName || user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
