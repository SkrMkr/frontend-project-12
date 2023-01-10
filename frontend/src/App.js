import React, { useEffect, useState } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Homepage';
import Notfound from './pages/Notfoundpage';
import Loginpage from './pages/Loginpage';
import Signup from './pages/Signup';
import AuthContext from './contexts';
import { ChatProvider } from './contexts/chat';
import Header from './components/header';
import pathes from './pathes';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const AuthProvider = ({ children }) => {
  const stateInit = localStorage.token;
  const [loggedIn, setLoggedIn] = useState(stateInit);

  const notify = (type, text) => {
    if (type === 'success') {
      toast.success(text, { toastId: `${text} sucsess` });
      return;
    }
    toast.error(text, { toatId: `${text} error` });
  };

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
      loggedIn, logIn, logOut, notify,
    }}
    >
      <Header loggedIn={loggedIn} logOut={logOut} />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContext.Provider>
  );
};

const PrivateAccess = ({ children }) => {
  if (!localStorage.token) {
    return <Navigate to={pathes.login} />;
  }
  return children;
};

const rollbarConfig = {
  accessToken: process.env.TOKEN_ROLLBAR,
  environment: process.env.ENVIRONMENT_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

const App = ({ socket }) => {
  useEffect(() => {
    socket.on('connect_error', (e) => {
      rollbar.error(e);
    });
  }, [socket]);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            <Route
              path={pathes.home}
              element={(
                <PrivateAccess>
                  <ChatProvider socket={socket}>
                    <Home />
                  </ChatProvider>
                </PrivateAccess>
          )}
            />
            <Route path={pathes.login} element={<Loginpage />} />
            <Route path={pathes.signup} element={<Signup />} />
            <Route path={pathes.notFound} element={<Notfound />} />
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
