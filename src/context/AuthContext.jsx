import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // Integrating your professional API utility

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false); // Used for login/logout actions
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // Used for the initial boot-up

  /**
   * ✅ PROFESSIONAL PERSISTENCE CHECK
   * Instead of just trusting localStorage, a production app should 
   * ideally call a /me or /verify endpoint to ensure the token is still valid.
   */
  const checkSession = useCallback(async () => {
    const storedToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser");

    if (storedToken && storedUser) {
      try {
        // Option 1: Trust local storage (Standard)
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);

        // Option 2: Verify with Backend (Professional Grade)
        // const response = await API.get("/auth/verify");
        // setUser(response.user); 
      } catch (error) {
        console.error("Session restoration failed:", error);
        logout();
      }
    }
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  /**
   * ✅ LOGIN FUNCTION
   * Connects to your backend via axios (API)
   */
  const login = async ({ email, password, remember }) => {
    setLoading(true);
    try {
      const res = await API.post("/admin/login", { email, password });
      
      const { token: receivedToken, user: userData } = res.data;

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("adminToken", receivedToken);
      storage.setItem("adminUser", JSON.stringify(userData));

      setToken(receivedToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || "Invalid credentials" 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * ✅ LOGOUT FUNCTION
   * Cleans all storage types and resets state
   */
  const logout = useCallback(() => {
    ["adminToken", "adminUser"].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // replace: true prevents users from hitting "back" to return to an admin page
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated,
    checkingAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!checkingAuth ? children : (
        /* Professional Grade: Global Loader to prevent UI flicker */
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};