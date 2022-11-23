import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const OutputMessages = () => {
  const messages = useSelector(selectors.selectAll);
  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      { messages.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>
          :
          {' '}
          {message.body}
        </div>
      ))}
    </>
  );
};

export default OutputMessages;
