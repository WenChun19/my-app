import { createContext, useContext, useEffect, useState } from "react";
import { accessToken } from "../constants";
import { getCookie, resetAuth } from "../utils/cookies-helper";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!getCookie(accessToken));
  const location = useLocation();

  useEffect(() => {
    const accessTkn = getCookie(accessToken);
    if (accessTkn) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location?.pathname]);

  const setLogout = () => {
    setIsLogin(false);
    resetAuth();
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
