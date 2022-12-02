import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChatContext from '../../contexts/chat';

const Remove = (props) => {
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const { setCurrentChannelId, removeChannel } = chatContext;

  const remove = (id) => {
    removeChannel(id);
    onHide();
    setCurrentChannelId(1);
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Отменить</Button>
        <Button variant="danger" onClick={() => remove(channel.id)}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
