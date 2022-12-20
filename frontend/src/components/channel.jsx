import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
    <li className="nav-item w-100" key={channel.id}>
      { !channel.removable
        ? (
          <button
            type="button"
            onClick={() => setCurrentChannel(channel)}
            className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
              'btn-secondary': channel.id === currentChannel.id,
            })}
          >
            <span>#</span>
            {' '}
            {channel.name}
          </button>
        )
        : (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              variant={channel.id === currentChannel.id && 'secondary'}
              onClick={() => setCurrentChannel(channel)}
              className="w-100 rounded-0 text-start text-truncate"
            >
              <span className="me-1">#</span>
              {' '}
              {channel.name}
            </Button>
            <Dropdown.Toggle
              split
              variant={channel.id === currentChannel.id && 'secondary'}
              id={`dropdown-split-basic-${channel.id}`}
            />
            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => showModal('removing', channel)}
              >
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => showModal('renaming', channel)}
              >
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </li>
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
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 flex-nowrap">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            currentChannel={currentChannel}
            setCurrentChannel={setCurrentChannel}
            showModal={showModal}
          />
        ))}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </>
  );
};

export default ChannelsContainer;
