import React from "react";
import axios from "axios";
import App from "./App";
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/authContext";
import { createRoot } from 'react-dom/client';

axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
const root =createRoot(document.getElementById("root"));



//  root.render(<App />);
// console.log("Rendering app...");
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
