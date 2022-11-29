import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const SideNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="sidenav">
      <button onClick={() => navigate('/')}>home</button>
      <button id="logout-button" onClick={logout}>
        logout
      </button>
      <br></br>
      <br></br>
      <button id="favourite" onClick={() => navigate('/favorites')}>
        favorites
      </button>
      <a href="#about">About</a>
    </div>
  );
};

export default SideNav;
