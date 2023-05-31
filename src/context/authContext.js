import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";
import Cookies from "universal-cookie";
import { addMinutes } from 'date-fns';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // console.log(currentUser);
  // const cookies = new Cookies();

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const login = async (inputs) => {
    try {
      const token = cookies.get("access_token");
     
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        inputs,
        {withCredentials: true},
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('login response', res.data)

      setCurrentUser(res.data);

      const expirationDate = addMinutes(new Date(), 15);

      // set the authentication token in a cookie
      cookies.set("access_token", res.data.token, {
        // cookies.set("token", token, {
        expires: expirationDate,
        path:"/",
        sameSite: "none",
        secure: true,
      });
      // console.log('cookies response', cookies)
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout");
      setCurrentUser(null);
      // remove the authentication token cookie
      // cookies.remove("access_token");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser])


  useEffect(() => {
    // get the authentication token from the cookie when the component mounts
    // Mechanism for persisting user info 
    const access_token = cookies.get("access_token");
    if (access_token) {
      setCurrentUser({...currentUser, token: access_token });
      console.log('token', access_token);
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
