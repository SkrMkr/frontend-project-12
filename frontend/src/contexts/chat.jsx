import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as messagesAction } from '../slices/messagesSlice';
import { actions as channelAction, selectors } from '../slices/channelsSlice';

const ChatContext = createContext({});

const ChatProvider = ({ setFeedback, socket, children }) => {
  const [currentChannel, setCurrentChannel] = useState({ id: 1, name: 'general' });
  const channels = useSelector(selectors.selectAll);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getNewMessage = () => socket.on('newMessage', (message) => {
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
      setFeedback({ type: 'error', text: t('feedback.error') });
    }
    setFeedback({ type: 'success', text: t('feedback.channel_add') });
    setCurrentChannel(response.data);
  });

  const subscribeRemoveChannel = () => socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload.id));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'response status ok') {
      setFeedback({ type: 'error', text: t('feedback.error') });
    }
    setFeedback({ type: 'success', text: t('feedback.channel_remove') });
    setCurrentChannel(channels[0]);
  });

  const subscribeRenameChannel = () => socket.on('renameChannel', (payload) => {
    dispatch(channelAction.renameChannel({ id: payload.id, changes: payload }));
    setCurrentChannel(payload);
  });

  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name }, (response) => {
    if (response.status !== 'response status ok') {
      setFeedback({ type: 'error', text: t('feedback.error') });
    }
    setFeedback({ type: 'success', text: t('feedback.channel_rename') });
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{
      setFeedback,
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
