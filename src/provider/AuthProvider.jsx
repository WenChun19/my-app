import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookies-helper";
import { accessToken } from "../constants";

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

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
