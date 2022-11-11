import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Homepage';
import Notfound from './pages/Notfoundpage';
import Loginpage from './pages/Loginpage';
import './App.css';

const App = () => (
  <div>
    <header>
      <Link to="/">Домашняя страница </Link>
      <Link to="/login">Логин</Link>
    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </div>
);

export default App;
