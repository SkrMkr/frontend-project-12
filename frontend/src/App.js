import React, { useState } from 'react';
import {
  Route, Routes, Link, Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Home from './pages/Homepage';
import Notfound from './pages/Notfoundpage';
import Loginpage from './pages/Loginpage';
import AuthContext from './contexts';
import './App.css';
import ChatContext from './contexts/chat';
import { actions as messagesAction } from './slices/messagesSlice';
import { actions as channelAction } from './slices/channelsSlice';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (token, username) => {
    setLoggedIn(true);
    localStorage.token = token;
    localStorage.username = username;
  };
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut,
    }}
    >
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

const ChatProvider = ({ children }) => {
  const [currentChannelId, setCurrentChannelId] = useState(1);
  const [feedback, setFeedback] = useState({ type: null, text: '' });
  const dispatch = useDispatch();
  const socket = io();
  const isConnected = () => socket.on('connect', () => {
    console.log('есть ли коннект', socket.connected);
  });
  const getNewMessage = () => socket.on('newMessage', (message) => {
    console.log('сообщение при подписке сокета на новые сообщения', message);
    dispatch(messagesAction.addMessage(message));
  });
  const sendNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    console.log('response status', response.status);
  });
  const getNewChannel = () => socket.on('newChannel', (channel) => {
    dispatch(channelAction.addChannel(channel));
  });

  const sendNewChannel = (name) => socket.emit('newChannel', { name }, (response) => {
    if (response.status !== 'response status ok') {
      setFeedback({ type: 'error', text: 'Ошибка' });
    }
    setFeedback({ type: 'success', text: 'Канал создан' });
    console.log(response.data.id);
    setCurrentChannelId(response.data.id);
  });

  const subscribeRemoveChannel = () => socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload.id));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'response status ok') {
      setFeedback({ type: 'error', text: 'Ошибка' });
    }
    setFeedback({ type: 'success', text: 'Канал удален' });
  });

  const subscribeRenameChannel = () => socket.on('renameChannel', (payload) => {
    dispatch(channelAction.renameChannel({ id: payload.id, changes: payload }));
  });

  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name }, (response) => {
    if (response.status !== 'response status ok') {
      setFeedback({ type: 'error', text: 'Ошибка' });
    }
    setFeedback({ type: 'success', text: 'Канал переименован' });
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{
      feedback,
      setFeedback,
      isConnected,
      getNewMessage,
      sendNewMessage,
      getNewChannel,
      currentChannelId,
      setCurrentChannelId,
      sendNewChannel,
      removeChannel,
      subscribeRemoveChannel,
      renameChannel,
      subscribeRenameChannel,
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <div>
      <header>
        <Link to="/">Домашняя страница </Link>
        <Link to="/login">Логин</Link>
      </header>
      <Routes>
        <Route path="/" element={<PrivateAccess><ChatProvider><Home /></ChatProvider></PrivateAccess>} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  </AuthProvider>
);

export default App;
