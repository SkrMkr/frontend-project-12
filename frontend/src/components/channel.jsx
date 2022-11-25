import Container from 'react-bootstrap/Container';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectors } from '../slices/channelsSlice';
import ChatContext from '../contexts/chat';

const ChannelsContainer = () => {
  const channels = useSelector(selectors.selectAll);
  const chatContext = useContext(ChatContext);
  const { currentChannelId, setCurrentChannelId } = chatContext;

  const showId = (id) => {
    setCurrentChannelId(id);
    console.log('just test for click');
  };
  return (
    <div className="h-100">
      <Container>
        <Row>
          <Col>
            <span>Каналы</span>
          </Col>
          <Col md="auto">
            <Button>+</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <ListGroup>
          {channels.map((channel) => (
            <ListGroup.Item
              key={channel.id}
              active={channel.id === currentChannelId}
              onClick={() => showId(channel.id)}
            >
              {channel.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default ChannelsContainer;
