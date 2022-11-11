import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const schema = yup.object().shape({
  username: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const Loginpage = () => (
  <div>
    <h1>Войти</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={() => console.log('test')}
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
              required=""
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
              required=""
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
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Loginpage;
