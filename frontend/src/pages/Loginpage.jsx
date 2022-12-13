import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts';
import routes from '../routes';

const schema = yup.object().shape({
  username: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const Loginpage = () => {
  const [formState, setFormState] = useState('valid');
  const navigate = useNavigate();
  const userAuth = useContext(AuthContext);
  const { t } = useTranslation();
  const goHome = () => navigate('/');

  const authorization = ({ username, password }) => {
    axios.post(routes.loginPath(), {
      username,
      password,
    })
      .then((answer) => {
        userAuth.logIn(answer.data.token, username);
        goHome();
      })
      .catch((e) => {
        if (e.response.status !== 401) {
          setFormState('network_error');
          return;
        }
        setFormState('invalid');
      });
  };

  return (
    <div>
      <h1>{t('logIn.title')}</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => authorization(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                name="username"
                autoComplete="username"
                required
                placeholder={t('placeholder.username_login')}
                id="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {touched.username && errors.username && (
              <Form.Text className="text-muted">
                {errors.username}
              </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="password"
                autoComplete="password"
                required
                placeholder={t('placeholder.password')}
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
              <Form.Text className="text-muted">
                {errors.password}
              </Form.Text>
              )}
            </Form.Group>
            { formState === 'invalid' && <div className="feedback">{t('logIn.errors.authorization')}</div>}
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </Form>
        )}
      </Formik>
      {formState === 'network_error' && <Alert key="danger" variant="danger" dismissible>{t('logIn.errors.network_error')}</Alert>}
      <div>
        {t('logIn.new_user')}
        {' '}
        <Link to="/signup">{t('signUp.title')}</Link>
      </div>
    </div>
  );
};

export default Loginpage;
