import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ChatContext from '../contexts/chat';

const InputMessage = () => {
  const [text, setText] = useState('');
  const chatContext = useContext(ChatContext);
  const { t } = useTranslation();
  const { sendNewMessage, currentChannel } = chatContext;

  const sendMessage = () => {
    const message = {
      body: text,
      channelId: currentChannel.id,
      username: localStorage.username,
    };
    sendNewMessage(message);
    throw new Error('message');
    // setText('');
  };

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      sendMessage();
    }}
    >
      <Row>
        <Col lg>
          <Form.Control type="text" placeholder={t('placeholder.input_message')} value={text} onChange={(e) => setText(e.target.value)} />
        </Col>
        <Col xs>
          <Button variant="light" type="submit" disabled={text === ''}>
            Отправить
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputMessage;
