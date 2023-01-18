import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as messagesAction } from '../slices/messagesSlice';
import { actions as channelAction, selectors } from '../slices/channelsSlice';

const ChatContext = createContext({});

const ChatProvider = ({ socket, children }) => {
  const [currentChannel, setCurrentChannel] = useState({ id: 1, name: 'general' });
  const channels = useSelector(selectors.selectAll);

  const dispatch = useDispatch();

  const getNewMessage = () => socket.on('newMessage', (message) => {
    dispatch(messagesAction.addMessage(message));
  });

  const sendNewMessage = (message) => socket.emit('newMessage', message);

  const getNewChannel = () => socket.on('newChannel', (channel) => {
    dispatch(channelAction.addChannel(channel));
  });

  const sendNewChannel = (name) => socket.emit('newChannel', { name }, (response) => {
    setCurrentChannel(response.data);
  });

  const subscribeRemoveChannel = () => socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload.id));
    setCurrentChannel(channels[0]);
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, () => {
    setCurrentChannel(channels[0]);
  });

  const subscribeRenameChannel = () => socket.on('renameChannel', (payload) => {
    dispatch(channelAction.renameChannel({ id: payload.id, changes: payload }));
    setCurrentChannel(payload);
  });

  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{
      getNewMessage,
      sendNewMessage,
      getNewChannel,
      currentChannel,
      setCurrentChannel,
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

export { ChatProvider };
export default ChatContext;
