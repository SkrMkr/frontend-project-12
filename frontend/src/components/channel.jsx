import Container from 'react-bootstrap/Container';
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { selectors } from '../slices/channelsSlice';
import ChatContext from '../contexts/chat';
import getModal from './modals/index';

const renderModal = (modalInfo, hideModal) => {
  if (modalInfo.type === null) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component onHide={hideModal} channel={modalInfo.channel} />;
};

const ChannelItem = (props) => {
  const {
    channel,
    currentChannelId,
    setCurrentChannelId,
    showModal,
  } = props;
  return (
    <ListGroup.Item
      active={channel.id === currentChannelId}
      onClick={() => setCurrentChannelId(channel.id)}
    >
      <Row>
        <Col>
          <span>#</span>
          {' '}
          {channel.name}
        </Col>
        <Col>
          <span>
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                variant="secondary"
              />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={() => showModal('renaming', channel)}>
                  Переименовать
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const ChannelsContainer = () => {
  const channels = useSelector(selectors.selectAll);
  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const showModal = (nameModal, channel = null) => setModalInfo({ type: nameModal, channel });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const chatContext = useContext(ChatContext);
  const { currentChannelId, setCurrentChannelId } = chatContext;

  return (
    <div className="h-100">
      <Container>
        <Row>
          <Col>
            <span>Каналы</span>
          </Col>
          <Col md="auto">
            <Button onClick={() => showModal('adding')}>+</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <ListGroup>
          {channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              channel={channel}
              currentChannelId={currentChannelId}
              setCurrentChannelId={setCurrentChannelId}
              showModal={showModal}
            />
          ))}
        </ListGroup>
        {renderModal(modalInfo, hideModal)}
      </Container>
    </div>
  );
};

export default ChannelsContainer;
