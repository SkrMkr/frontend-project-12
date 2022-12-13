import React, { useState } from 'react';
import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import Home from './pages/Homepage';
import Notfound from './pages/Notfoundpage';
import Loginpage from './pages/Loginpage';
import Signup from './pages/Signup';
import AuthContext from './contexts';
import { ChatProvider } from './contexts/chat';
import Header from './components/header';
import './App.css';

const AuthProvider = ({ children }) => {
  const stateInit = localStorage.token;
  const [loggedIn, setLoggedIn] = useState(stateInit);

  const logIn = (token, username) => {
    setLoggedIn(true);
    localStorage.token = token;
    localStorage.username = username;
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
    window.location = '/login';
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut,
    }}
    >
      <Header loggedIn={loggedIn} logOut={logOut} />
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
      <Routes>
        <Route path="/" element={<PrivateAccess><ChatProvider><Home /></ChatProvider></PrivateAccess>} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  </AuthProvider>
);

export default App;
