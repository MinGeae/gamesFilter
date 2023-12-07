import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import OnlyLayout from "./layouts/OnlyLayout";
import Login from "./pages/login";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <OnlyLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
