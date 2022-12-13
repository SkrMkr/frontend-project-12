import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';

const Header = (props) => {
  const { t } = useTranslation();
  const { loggedIn, logOut } = props;

  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            {t('header.title')}
          </Link>
        </Navbar.Brand>
        { loggedIn && <Button variant="primary" onClick={() => logOut()}>{t('header.button_exit')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
