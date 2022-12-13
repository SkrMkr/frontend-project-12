import React, { useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice';
import ChatContext from '../../contexts/chat';
import getValidationSchema from '../../validate';

const Add = (props) => {
  const inputRef = useRef();
  const chatContext = useContext(ChatContext);
  const { t } = useTranslation();
  const { sendNewChannel } = chatContext;
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
      sendNewChannel(values.nameChannel);
      onHide();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.modal.add_title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
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
