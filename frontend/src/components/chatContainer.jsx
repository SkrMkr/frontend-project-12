import Container from 'react-bootstrap/Container';
import InputMessage from './inputMessage';
import OutputMessages from './outputMessage';

const ChatContainer = () => (
  <div className="flex-column h-100">
    <Container>
      <h4>Название чата</h4>
    </Container>
    <Container>
      Коробка для чата
      <OutputMessages />
    </Container>
    <Container className="input-message">
      <InputMessage />
    </Container>
  </div>
);

export default ChatContainer;
