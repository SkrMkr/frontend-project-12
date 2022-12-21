import { useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import routes from '../routes';
import getShema from '../validate';
import AuthContext from '../contexts';
import registration from '../images/registration.jpg';
import FeedbackTooltip from '../components/feedbackTooltip';

const Signup = ({ setFeedback }) => {
  const [state, setState] = useState('');
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const targetUsername = useRef();
  const targetPassword = useRef();
  const targetPasswordConf = useRef();
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
    <div className="row justify-content-center align-content-center flex-grow-1 bg-light">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="d-flex card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={registration} alt={t('signUp.title')} className="rounded-circle" />
            </div>
            <Form className="w-50" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">{t('signUp.title')}</h1>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingInputUsername"
                  label={t('placeholder.username')}
                  className="mb-3"
                >
                  <Form.Control
                    name="username"
                    id="username"
                    value={formik.values.username}
                    placeholder={t('placeholder.username')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={targetUsername}
                    className={formik.touched.username
                    && formik.errors.username ? 'is-invalid' : ''}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingInputPassword"
                  label={t('placeholder.password')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t('placeholder.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={targetPassword}
                    className={formik.touched.password
                    && formik.errors.password ? 'is-invalid' : ''}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-4">
                <FloatingLabel
                  controlId="floatingInputPasswordConf"
                  label={t('placeholder.password')}
                  className="mb-3"
                >
                  <Form.Control
                    name="passwordConfirm"
                    id="passwordConfirm"
                    type="password"
                    placeholder={t('placeholder.passwordConfirm')}
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={targetPasswordConf}
                    className={formik.touched.passwordConfirm
                    && formik.errors.passwordConfirm ? 'is-invalid' : ''}
                  />
                </FloatingLabel>
              </Form.Group>
              {state === 'user_registered' && <div className="text-muted">{t('signUp.errors.user_registered')}</div>}
              <Button className="w-100" variant="outline-primary" type="submit">
                {t('signUp.button')}
              </Button>
            </Form>
            <FeedbackTooltip
              target={targetUsername.current}
              show={formik.errors.username && formik.touched.username}
              text={formik.errors.username}
            />
            <FeedbackTooltip
              target={targetPassword.current}
              show={formik.errors.password && formik.touched.password}
              text={formik.errors.password}
            />
            <FeedbackTooltip
              target={targetPasswordConf.current}
              show={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
              text={formik.errors.passwordConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
