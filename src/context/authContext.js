import axios from "axios";
import { createContext, useEffect, useState, } from "react";
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);
  const cookies = new Cookies();

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        // "http://localhost:8080/api/login",
        inputs
      );
      console.log('login response', res.headers)
      setCurrentUser(res.data);

      // set the authentication token in a cookie
      cookies.set("access_token", res.data.token );
      console.log('cookies response', cookies)
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout");
      setCurrentUser(null);

      // remove the authentication token cookie
      cookies.remove("access_token");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  useEffect(() => {
    // get the authentication token from the cookie when the component mounts
    const access_token = cookies.get("access_token");
    if (access_token) {
      setCurrentUser({...currentUser, token: access_token });
      console.log('useEffect: ', currentUser);
    }
  }, []);

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
