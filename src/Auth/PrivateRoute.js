import { Navigate } from "react-router-dom";

// PrivateRoute component to check if the user is authenticated
const PrivateRoute = ({ element, user, ...rest }) => {
    if (!user) {
        // If no user is found (not logged in), redirect to login
        return <Navigate to="/login" />;
    }

    // Otherwise, render the passed element
    return element;
};

export default PrivateRoute;
