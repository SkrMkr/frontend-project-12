import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ChatContext from '../contexts/chat';

const InputMessage = () => {
  const [text, setText] = useState('');
  const chatContext = useContext(ChatContext);
  const { t } = useTranslation();
  const ref = useRef();
  const { sendNewMessage, currentChannel } = chatContext;

  const sendMessage = () => {
    const message = {
      body: text,
      channelId: currentChannel.id,
      username: localStorage.username,
    };
    sendNewMessage(message);
    setText('');
  };

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <Form
      className="py-1 border rounded-2"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={t('placeholder.input_message')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label={t('placeholder.new_message')}
          className="border-0 p-0 ps-2"
          ref={ref}
        />
        <Button variant="light" type="submit" disabled={text === ''}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">
            {t('chat_container.send')}
          </span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default InputMessage;
