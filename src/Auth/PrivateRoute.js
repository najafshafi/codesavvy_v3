import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, user }) => {
  const location = useLocation();

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Render the protected component
  return element;
};

export default PrivateRoute;
