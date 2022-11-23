import Container from 'react-bootstrap/Container';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectors } from '../slices/channelsSlice';

const showId = () => console.log('just test for click');

const ChannelBtn = ({ channel }) => (
  <>
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href={`#${channel.id}`} onClick={showId}>{channel.name}</Navbar.Brand>
      </Container>
    </Navbar>
    <br />
  </>
);

const ChannelsContainer = () => {
  const channels = useSelector(selectors.selectAll);

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
        {channels.map((channel) => <ChannelBtn key={channel.id} channel={channel} />)}
      </Container>
    </div>
  );
};

export default ChannelsContainer;
