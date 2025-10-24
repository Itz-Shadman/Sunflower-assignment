import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase.config";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Toaster />
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-600 tracking-wide">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-lg py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-gray-500 hover:text-blue-600 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-3 text-sm font-medium">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>

        <div className="divider text-gray-500 mt-6">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full border-2 border-gray-300 bg-white text-blue-400 hover:bg-gray-50 flex items-center justify-center gap-2 py-3 rounded-lg transition-all hover:scale-105"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
