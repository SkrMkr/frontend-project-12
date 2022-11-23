import { Link } from 'react-router-dom';

const Notfound = () => (
  <div className="flex-container">
    Страница не найдена. Но вы можете перейти
    <Link to="/">на главную страницу</Link>
    .
  </div>
);

export default Notfound;
