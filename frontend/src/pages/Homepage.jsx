import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsContainer from '../components/channel';
import ChatContainer from '../components/chatContainer';
import { actions as channelsAction } from '../slices/channelsSlice';
import { actions as messagesAction } from '../slices/messagesSlice';
import routes from '../routes';
import ChatContext from '../contexts/chat';

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation;
  const chatContext = useContext(ChatContext);
  const {
    setFeedback,
    getNewChannel,
    getNewMessage,
    subscribeRemoveChannel,
    subscribeRenameChannel,
  } = chatContext;

  useEffect(() => {
    const getResponse = async () => {
      const tokenForRequest = `Bearer ${localStorage.getItem('token')}`;
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: {
            Authorization: tokenForRequest,
          },
        });
        const { channels, messages } = data;

        dispatch(channelsAction.addChannels(channels));
        dispatch(messagesAction.addMessages(messages));
      } catch (e) {
        setFeedback({ type: 'error', text: t('feedback.error_network') });
      }
    };

    getResponse();
    getNewMessage();
    getNewChannel();
    subscribeRemoveChannel();
    subscribeRenameChannel();
  });

  return (
    <div className="container rounded my-4 h-100 overflow-hidden shadow flex-grow-1">
      <div className="row d-flex flex-row bg-white h-100">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelsContainer />
        </div>
        <div className="col h-100 p-0">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
