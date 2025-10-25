// This is forget password section 
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { Link, useLocation } from "react-router";

export default function ForgotPassword() {
  const location = useLocation();
  const prefillEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefillEmail);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError("❌ Failed to send reset email. Please check your email address.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 hover:shadow-blue-200 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 drop-shadow-sm">
          Forgot Password
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {message && <p className="text-green-600 text-center mb-2">{message}</p>}

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-200 shadow-md"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
