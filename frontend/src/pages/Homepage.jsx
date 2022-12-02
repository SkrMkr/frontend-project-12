import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import ChannelsContainer from '../components/channel';
import ChatContainer from '../components/chatContainer';
import { actions as channelsAction } from '../slices/channelsSlice';
import { actions as messagesAction } from '../slices/messagesSlice';
import routes from '../routes';
import ChatContext from '../contexts/chat';

const Home = () => {
  const dispatch = useDispatch();
  const chatContext = useContext(ChatContext);
  const {
    getNewChannel,
    getNewMessage,
    subscribeRemoveChannel,
    subscribeRenameChannel,
  } = chatContext;

  useEffect(() => {
    const getResponse = async () => {
      const tokenForRequest = `Bearer ${localStorage.getItem('token')}`;
      const { data } = await axios.get(routes.usersPath(), {
        headers: {
          Authorization: tokenForRequest,
        },
      });
      const { channels, messages } = data;

      dispatch(channelsAction.addChannels(channels));
      dispatch(messagesAction.addMessages(messages));
    };

    getResponse();
    getNewMessage();
    getNewChannel();
    subscribeRemoveChannel();
    subscribeRenameChannel();
  });

  return (
    <div className="flex-container h-100">
      <Row className="justify-content-md-center h-100">
        <Col lg={6} md={4}>
          <ChannelsContainer />
        </Col>
        <Col lg={12} md={8}>
          <ChatContainer />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
