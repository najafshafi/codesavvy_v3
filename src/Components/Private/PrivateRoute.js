import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, user }) => {
    const location = useLocation();
    return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
