import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem("token");

    // Remove token from axios headers
    delete axios.defaults.headers.common["Authorization"];

    // Send request to delete refresh token
    axios
      .delete("http://127.0.0.1:8000/api/token/refresh/delete", {
        withCredentials: true,
      })
      .then(() => {
        // Navigate to homepage
        window.location.reload()
        navigate('/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <button onClick={handleLogout}>Wyloguj</button>
  );
};

export default Logout;
