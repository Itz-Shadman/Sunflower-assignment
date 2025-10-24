// src/Pages/ForgotPassword.jsx
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
    setError(""); setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please check your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 bg-white p-6 rounded shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-300">Forgot Password</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
        <form onSubmit={handleReset} className="flex flex-col gap-4 border-0 border-blue-500">
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" required/>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Reset Password</button>
        </form>
        <p className="text-center mt-4"><Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link></p>
      </div>
    </div>
  );
}
