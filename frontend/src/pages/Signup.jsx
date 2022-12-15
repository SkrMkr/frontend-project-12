import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import routes from '../routes';
import getShema from '../validate';
import AuthContext from '../contexts';

const Signup = ({ setFeedback }) => {
  const [state, setState] = useState('');
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const { logIn } = authContext;

  const navigate = useNavigate();
  const goHome = () => navigate('/');

  const createUser = ({ username, password }) => {
    axios.post(routes.createUserPath(), {
      username,
      password,
    })
      .then((response) => {
        console.log(response);
        logIn(response.data.token, response.data.username);
        goHome();
      })
      .catch((e) => {
        if (e.response.status !== 409) {
          setFeedback({ type: 'error', text: t('feedback.error_network') });
          return;
        }
        setState('user_registered');
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: getShema('signUp')(),
    validateOnChange: true,
    onSubmit: (values) => createUser(values),
  });

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Label>{t('signUp.title')}</Form.Label>
        <Form.Group className="mb-3">
          <Form.Control
            name="username"
            id="username"
            placeholder={t('placeholder.username')}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username
          && formik.errors.username
          && (
          <div className="text-muted">
            {formik.errors.username}
          </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder={t('placeholder.password')}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        {formik.touched.password
          && formik.errors.password
          && (
          <div className="text-muted">
            {formik.errors.password}
          </div>
          )}
        <Form.Group className="mb-3">
          <Form.Control
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            placeholder={t('placeholder.passwordConfirm')}
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        {formik.touched.passwordConfirm
          && formik.errors.passwordConfirm
          && (
          <div className="text-muted">
            {formik.errors.passwordConfirm}
          </div>
          )}
        {state === 'user_registered' && <div className="text-muted">{t('signUp.errors.user_registered')}</div>}
        <Button variant="primary" type="submit">
          {t('signUp.button')}
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
