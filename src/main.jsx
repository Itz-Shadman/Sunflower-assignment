import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import SkillDetails from "./Pages/SkillsDetails.jsx";
import PrivateRoute from "./Pages/PrivateRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "skills/:id",
        element: <PrivateRoute><SkillDetails /></PrivateRoute>,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot", element: <ForgotPassword /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
