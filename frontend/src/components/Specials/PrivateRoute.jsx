import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // Check if the user is authenticated
    if (!token) {
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    // Check if the user's role matches the required role (if specified)
    if (role && userRole !== role) {
        return <Navigate to="/" />; // Redirect to login if role doesn't match
    }

    return <Outlet />; // Render the nested route components
};

export default PrivateRoute;