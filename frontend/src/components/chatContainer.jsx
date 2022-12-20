import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ChatContext from '../contexts/chat';
import InputMessage from './inputMessage';
import OutputMessages from './outputMessage';
import { selectors } from '../slices/messagesSlice';
import 'react-toastify/dist/ReactToastify.css';

const ChatContainer = () => {
  const chatContext = useContext(ChatContext);
  const {
    currentChannel,
  } = chatContext;
  const { t } = useTranslation();
  const messages = useSelector(selectors.selectAll);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannel.id);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {currentChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {t('chat_container.message', { count: filteredMessages.length })}
        </span>
      </div>
      <div className="overflow-auto flex-grow-1 px-5">
        <OutputMessages />
      </div>
      <div className="mt-auto px-5 py-3">
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
