import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import ChatContext from '../../contexts/chat';

const Remove = (props) => {
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const { t } = useTranslation();
  const { removeChannel } = chatContext;

  const remove = (id) => {
    removeChannel(id);
    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.modal.remove_title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('channels.modal.confirm')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>{t('channels.modal.cancel_button')}</Button>
        <Button variant="danger" onClick={() => remove(channel.id)}>{t('channels.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
