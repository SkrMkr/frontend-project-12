import { useContext } from 'react';
import { useSelector } from 'react-redux';
import LeoProfanity from 'leo-profanity';
import { selectors } from '../slices/messagesSlice';
import ChatContext from '../contexts/chat';

const OutputMessages = () => {
  const chatContext = useContext(ChatContext);
  const { currentChannel } = chatContext;
  const messages = useSelector(selectors.selectAll);
  if (messages.length === 0) {
    return null;
  }

  const censorship = LeoProfanity;
  const ruWords = censorship.getDictionary('ru');
  censorship.add(ruWords);

  const filteredMessages = messages.filter((message) => message.channelId === currentChannel.id);

  return (
    <>
      { filteredMessages.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>
          :
          {' '}
          {censorship.clean(message.body)}
        </div>
      ))}
    </>
  );
};

export default OutputMessages;
