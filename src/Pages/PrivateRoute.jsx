// This is Private route section 
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
