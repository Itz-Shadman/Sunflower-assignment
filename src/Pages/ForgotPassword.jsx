import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefillEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefillEmail);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      window.open("https://mail.google.com", "_blank");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Toaster />
      <div className="card w-96 bg-base-100 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-4"
            required
          />
          <button className="btn btn-primary w-full">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
