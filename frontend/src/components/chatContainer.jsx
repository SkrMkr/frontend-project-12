import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ChatContext from '../contexts/chat';
import InputMessage from './inputMessage';
import OutputMessages from './outputMessage';
import { selectors } from '../slices/messagesSlice';

const Notification = (props) => {
  const { feedback, onHide } = props;
  setTimeout(() => onHide(), 5000);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={feedback.type === 'success' ? 'success' : 'danger'} position="top-end" className="p-3" onClick={onHide}>
        <Toast.Header>
          <strong className="me-auto">Уведомление</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{feedback.text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

const ChatContainer = () => {
  const chatContext = useContext(ChatContext);
  const {
    currentChannel, feedback, setFeedback,
  } = chatContext;
  const { t } = useTranslation();
  const messages = useSelector(selectors.selectAll);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannel.id);
  const onHide = () => setFeedback({ type: null, text: '' });

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
      { feedback.type !== null && <Notification feedback={feedback} onHide={onHide} />}
    </div>
  );
};

export default ChatContainer;
