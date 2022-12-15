import React, { useEffect, useState } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Home from './pages/Homepage';
import Notfound from './pages/Notfoundpage';
import Loginpage from './pages/Loginpage';
import Signup from './pages/Signup';
import AuthContext from './contexts';
import { ChatProvider } from './contexts/chat';
import Header from './components/header';
import 'react-toastify/dist/ReactToastify.css';
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

const App = ({ socket }) => {
  const [feedback, setFeedback] = useState({ type: null, text: '' });
  const { t } = useTranslation();

  const rollbarConfig = {
    accessToken: 'f0b16381592541e6b64bd476533bcc6d',
    environment: 'development',
  };

  function TestError() {
    const a = null;
    return a.hello();
  }

  const notify = (type, text) => {
    if (type === 'success') {
      toast.success(text, { toastId: `${text} sucsess` });
      setFeedback({ type: null, text: '' });
      return;
    }
    toast.error(text, { toatId: `${text} error` });
    setFeedback({ type: null, text: '' });
  };

  useEffect(() => {
    socket.on('connect_error', (e) => {
      setFeedback({ type: 'error', text: t('feedback.error_network') });
      console.log(e);
    });
  }, []);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <AuthProvider>
          <div>
            <Routes>
              <Route
                path="/"
                element={(
                  <PrivateAccess>
                    <ChatProvider socket={socket} setFeedback={setFeedback}>
                      <Home />
                    </ChatProvider>
                  </PrivateAccess>
          )}
              />
              <Route path="/login" element={<Loginpage setFeedback={setFeedback} />} />
              <Route path="/signup" element={<Signup setFeedback={setFeedback} />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
            { feedback.type !== null && notify(feedback.type, feedback.text)}
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
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
