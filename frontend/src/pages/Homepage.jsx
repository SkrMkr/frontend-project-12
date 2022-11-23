import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChannelsContainer from '../components/channel';
import ChatContainer from '../components/chatContainer';
import { actions as channelsAction } from '../slices/channelsSlice';
import { actions as messagesAction } from '../slices/messagesSlice';
import routes from '../routes';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getResponse = async () => {
      const tokenForRequest = `Bearer ${localStorage.getItem('token')}`;
      const { data } = await axios.get(routes.usersPath(), {
        headers: {
          Authorization: tokenForRequest,
        },
      });
      const { channels, currentChannelId, messages } = data;
      console.log('данные', data);
      console.log(data, channels, currentChannelId, messages);
      console.log('Данные', data);

      dispatch(channelsAction.addChannels(channels));
      dispatch(messagesAction.addMessages(messages));
    };
    console.log('до запуска запроса');
    getResponse();
    // сокеты тут
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
