import Container from 'react-bootstrap/Container';
import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const {
    channel,
    currentChannel,
    setCurrentChannel,
    showModal,
  } = props;

  return (
    <ListGroup.Item
      active={channel.id === currentChannel.id}
      onClick={() => setCurrentChannel(channel)}
    >
      <Row>
        <Col>
          <span>#</span>
          {' '}
          {channel.name}
        </Col>
        {channel.removable
        && (
        <Col>
          <span>
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                variant="secondary"
              />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('channels.remove')}</Dropdown.Item>
                <Dropdown.Item onClick={() => showModal('renaming', channel)}>
                  {t('channels.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </Col>
        )}
      </Row>
    </ListGroup.Item>
  );
};

const ChannelsContainer = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const showModal = (nameModal, channel = null) => setModalInfo({ type: nameModal, channel });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const chatContext = useContext(ChatContext);
  const { currentChannel, setCurrentChannel } = chatContext;

  return (
    <div className="h-100">
      <Container>
        <Row>
          <Col>
            <span>{t('channels.title')}</span>
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
              currentChannel={currentChannel}
              setCurrentChannel={setCurrentChannel}
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
