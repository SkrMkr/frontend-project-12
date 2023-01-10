import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';

const Remove = (props) => {
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const { removeChannel } = chatContext;
  const { notify } = authContext;

  const remove = (id) => {
    try {
      removeChannel(id);
      onHide();
      notify('success', t('feedback.channel_remove'));
    } catch {
      notify('error', t('feedback.error'));
    }
  };

  return (
    <Modal show centered>
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
