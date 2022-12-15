import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
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
    <div className="flex-column h-100">
      <Container>
        <h4>{currentChannel.name}</h4>
        <div>{t('chat_container.message', { count: filteredMessages.length })}</div>
      </Container>
      <Container>
        <OutputMessages />
      </Container>
      <Container className="input-message">
        <InputMessage />
      </Container>
    </div>
  );
};

export default ChatContainer;
