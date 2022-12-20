import { Formik } from 'formik';
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts';
import routes from '../routes';
import image from '../images/login.jpeg';

const schema = yup.object().shape({
  username: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const Loginpage = ({ setFeedback }) => {
  const [formState, setFormState] = useState('valid');
  const navigate = useNavigate();
  const userAuth = useContext(AuthContext);
  const { t } = useTranslation();
  const ref = useRef();
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
          setFeedback({ type: 'error', text: t('feedback.error_network') });
          return;
        }
        setFormState('invalid');
      });
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 bg-light">
      <div className="col-md-8 col-12 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={image} alt={t('logIn.title')} className="rounded-circle" />
            </div>
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={schema}
              onSubmit={(values) => authorization(values)}
              validateOnChange="false"
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t('logIn.title')}</h1>
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
                      ref={ref}
                    />
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
                  </Form.Group>
                  { formState === 'invalid' && <div className="feedback">{t('logIn.errors.authorization')}</div>}
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" type="submit">
                      Войти
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              {t('logIn.new_user')}
              {' '}
              <Link to="/signup">{t('signUp.title')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
