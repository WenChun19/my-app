import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, removeCookie } from "../utils/cookies-helper";
import { accessToken, cartId } from "../constants";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!getCookie(accessToken));

  useEffect(() => {
    const accessTkn = getCookie(accessToken);
    if (accessTkn) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const setLogout = () => {
    setIsLogin(false)
    removeCookie(accessToken);
    removeCookie(cartId);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
