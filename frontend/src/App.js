import React from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProtectedRoute  from "./pages/ProtectedRoute.js";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <ProtectedRoute path="/profil" element={<Profil />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;