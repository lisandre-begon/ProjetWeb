// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthContext from './components/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import ProfilUser from './pages/ProfilUser';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!Cookies.get('token'));
    };

    // Listen for custom event
    window.addEventListener('auth', checkAuth);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('auth', checkAuth);
    };
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profil" element={<Admin />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;