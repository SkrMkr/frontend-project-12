import React, { useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { selectors } from '../../slices/channelsSlice';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';
import getValidationSchema from '../../validate';

const Add = (props) => {
  const inputRef = useRef();
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const { sendNewChannel } = chatContext;
  const { notify } = authContext;
  const { onHide } = props;

  const channels = useSelector(selectors.selectAll);
  const channelsName = channels.map((channel) => channel.name);
  const schema = getValidationSchema('schemaChannelName')(channelsName);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      try {
        sendNewChannel(values.nameChannel);
        onHide();
        notify('success', t('feedback.channel_add'));
      } catch {
        notify('error', t('feedback.error'));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.modal.add_title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameChannel}
              data-testid="nameChannel"
              name="nameChannel"
              ref={inputRef}
            />
            {formik.errors.nameChannel
            && (
            <Form.Text>
              {formik.errors.nameChannel}
            </Form.Text>
            )}
            <FloatingLabel
              controlId="name"
              label={t('channels.name')}
              className="visually-hidden"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>{t('channels.modal.cancel_button')}</Button>
          <Button type="submit" value="submit">{t('channels.modal.send_button')}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
