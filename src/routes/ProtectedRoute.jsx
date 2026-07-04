import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, checkingAuth } = useAuthContext();

  // 🔄 Show nothing while checking auth (optional: add spinner)
  if (checkingAuth) return null;

  // 🔒 User not logged in → redirect to login based on role
  if (!isAuthenticated) {
    const loginPath = role === "admin" ? "/admin/login" : "/login";
    return <Navigate to={loginPath} replace />;
  }

  // 🚫 User logged in but does not have the required role
  if (role && user?.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  // ✅ Authorized: render the child components
  return children;
};

export default ProtectedRoute;
