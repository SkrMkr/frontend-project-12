import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { selectors } from '../../slices/channelsSlice';
import getValidationSchema from '../../validate';
import ChatContext from '../../contexts/chat';

const Rename = (props) => {
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const { renameChannel } = chatContext;
  const inputRef = useRef();

  const channels = useSelector(selectors.selectAll);
  const channelsName = channels.map((el) => el.name);
  const schema = getValidationSchema('schemaChannelName')(channelsName);

  const formik = useFormik({
    initialValues: {
      nameChannel: channel.name,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      renameChannel(channel.id, values.nameChannel);
      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
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
          <Button variant="secondary" onClick={onHide}>Отменить</Button>
          <Button type="submit" value="submit">Отправить</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
