import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const SideNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="sidenav">
      <button onClick={() => navigate('/')}>Home</button>
      <br></br>
      <br></br>
      <button id="logout-button" onClick={logout}>
        Logout
      </button>
      <br></br>
      <br></br>
      <button id="favourite" onClick={() => navigate('/favorites')}>
        Favorites
      </button>
    </div>
  );
};

export default SideNav;
