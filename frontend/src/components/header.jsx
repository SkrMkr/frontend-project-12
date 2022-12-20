import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';

const Header = (props) => {
  const { t } = useTranslation();
  const { loggedIn, logOut } = props;

  return (
    <Navbar className="shadow-sm bg-white" expand="lg" variant="light">
      <Container className="d-flex p-2">
        <Navbar.Brand>
          <a href="/" className="link-dark text-decoration-none">
            {t('header.title')}
          </a>
        </Navbar.Brand>
        { loggedIn && <Button variant="primary" onClick={() => logOut()}>{t('header.button_exit')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
