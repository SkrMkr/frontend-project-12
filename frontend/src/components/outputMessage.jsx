import { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LeoProfanity from 'leo-profanity';
import { selectors } from '../slices/messagesSlice';
import ChatContext from '../contexts/chat';

const OutputMessages = () => {
  const chatContext = useContext(ChatContext);
  const { currentChannel } = chatContext;
  const lastMessageRef = useRef();
  const messages = useSelector(selectors.selectAll);

  const censorship = LeoProfanity;
  const ruWords = censorship.getDictionary('ru');
  censorship.add(ruWords);

  const filteredMessages = messages.filter((message) => message.channelId === currentChannel.id);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [filteredMessages]);

  return (
    <>
      { filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {censorship.clean(message.body)}
        </div>
      ))}
      <span ref={lastMessageRef} />
    </>
  );
};

export default OutputMessages;
