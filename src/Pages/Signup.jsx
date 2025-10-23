import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth, googleProvider } from "../Firebase/Firebase.config";
import { Link, useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    if (!upperCase || !lowerCase || !minLength) {
      setPasswordError("Password must have uppercase, lowercase and at least 6 characters.");
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success("Signup successful!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google signup successful!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleEmailSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            value={formData.photoURL}
            onChange={handleChange}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button type="submit" className="btn btn-primary mt-2">Register</button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline w-full text-gray-400 mt-2"
        >
          Continue with Google
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
