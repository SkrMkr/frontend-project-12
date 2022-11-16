import React, { useState } from 'react';
import {
  Route, Routes, Link, Navigate,
} from 'react-router-dom';
import Home from './pages/Homepage';
import Notfound from './pages/Notfoundpage';
import Loginpage from './pages/Loginpage';
import AuthContext from './contexts';
import './App.css';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (token) => {
    setLoggedIn(true);
    localStorage.token = token;
  };
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateAccess = ({ children }) => {
  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => (
  <AuthProvider>
    <div>
      <header>
        <Link to="/">Домашняя страница </Link>
        <Link to="/login">Логин</Link>
      </header>
      <Routes>
        <Route path="/" element={<PrivateAccess><Home /></PrivateAccess>} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  </AuthProvider>
);

export default App;
