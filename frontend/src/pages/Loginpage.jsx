import { Formik } from 'formik';
import React, { useRef } from 'react';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
// import AuthContext from '../contexts/authContext';

const schema = yup.object().shape({
  username: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const Loginpage = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  const authorization = ({ username, password }) => {
    axios.post(routes.loginPath(), {
      username,
      password,
    })
      .then((answer) => {
        console.log(answer);
        localStorage.token = answer.data.token;
        ref.current.classList.add('invalid-feedback');
        goHome();
      })
      .catch(() => {
        ref.current.classList.replace('invalid-feedback', 'feedback');
      });
  };

  return (
    <div>
      <h1>Войти</h1>
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
                placeholder="Ваш ник"
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
                placeholder="Ваш пароль"
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
            <div className="invalid-feedback" ref={ref}>Неверное имя пользователя или пароль.</div>
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Loginpage;
