import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // console.log('auth context ran')
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null));
  // console.log(currentUser);

  const login = async (inputs) => {
    try {
     
      const res = await axios.post(
        "api/auth/login",
        inputs,
        {withCredentials: true},
      );
      console.log('login response', res.data)

      setCurrentUser(res.data);

    } catch (error) {
      console.error("Error during login", error);
    }
    // console.log('app user context: ', currentUser)
  };

  const logout = async () => {
    try {
      await axios.post("api/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ 
      currentUser: currentUser, 
      login: login, 
      logout: logout 
      }}>
      {children}
    </AuthContext.Provider>
  );
};
