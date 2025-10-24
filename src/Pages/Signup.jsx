
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase.config";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const min = password.length >= 6;
    if (!upper || !lower || !min) {
      setPasswordError("Password must have uppercase, lowercase, and at least 6 characters.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;
    if (!validatePassword(password)) return;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name, photoURL });
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google signup successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <Toaster />
      <div className="bg-white shadow-2xl p-10 rounded-2xl w-full max-w-md border border-gray-200 hover:shadow-blue-200 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 drop-shadow-sm">
          Create an Account
        </h2>

        <form onSubmit={handleEmailSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Profile Photo URL (optional)"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            value={formData.photoURL}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button
            type="submit"
            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-200 shadow-md"
          >
            Register
          </button>
        </form>

        <div className="divider text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="btn w-full border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
        >
          Continue with Google
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
